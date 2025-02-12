import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {TravelPost, Tag, TagResult} from 'hybrid-types/DBTypes';
import {promisePool} from '../database';
import {MessageResponse} from 'hybrid-types/MessageTypes';
import CustomError from '../../classes/CustomError';
import {ERROR_MESSAGES} from '../../utils/errorMessages';

/**
 * Fetch all possible tags/categories
 * @returns all vacation/destination categories
 */
const fetchAllTags = async (): Promise<Tag[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & Tag[]>(
    'SELECT * FROM Tags',
  );
  return rows;
};

/**
 * Fetch posts based on tag/category id
 * @returns all the posts connected to the tag_id
 */
const fetchPostsByTagId = async (tag_id: number): Promise<TravelPost[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TravelPost[]>(
    `SELECT *
    FROM TravelPosts
     JOIN PostTags ON TravelPosts.post_id = PostTags.post_id
     WHERE PostTags.tag_id = ?`,
    [tag_id],
  );
  return rows;
};

/**
 * Add a category to a travel post
 * @param tag_name
 * @param post_id
 * @returns success/error message
 */
const postTag = async (
  tag_name: string,
  post_id: number,
): Promise<MessageResponse> => {
  let tag_id = 0;
  // check if tag exists (case insensitive)
  const [tagResult] = await promisePool.query<RowDataPacket[] & Tag[]>(
    'SELECT tag_id FROM Tags WHERE tag_name = ?',
    [tag_name],
  );

  if (tagResult.length === 0) {
    // if tag does not exist create it
    const [insertResult] = await promisePool.execute<ResultSetHeader>(
      'INSERT INTO Tags (tag_name) VALUES (?)',
      [tag_name],
    );
    tag_id = insertResult.insertId;
  } else {
    tag_id = tagResult[0].tag_id;
  }

  const [result] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO PostTags (tag_id, post_id) VALUES (?, ?)',
    [tag_id, post_id],
  );

  if (result.affectedRows === 0) {
    throw new CustomError(ERROR_MESSAGES.TAG.NOT_CREATED, 500);
  }

  return {message: 'Tag added'};
};

/**
 * Fetch all the tags based on a post id
 * @param id
 * @returns the tags/categories included in a post
 */
const fetchTagsByPostId = async (post_id: number): Promise<TagResult[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TagResult[]>(
    `SELECT Tags.tag_id, Tags.tag_name, PostTags.post_id
     FROM Tags
     JOIN PostTags ON Tags.tag_id = PostTags.tag_id
     WHERE PostTags.post_id = ?`,
    [post_id],
  );
  return rows;
};

/**
 * Admins can delete tags
 * @param tag_id
 * @returns success/error message
 */
const deleteTag = async (id: number): Promise<MessageResponse> => {
  const connection = await promisePool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM Tags WHERE tag_id = ?',
      [id],
    );

    if (result.affectedRows === 0) {
      throw new CustomError(ERROR_MESSAGES.TAG.NOT_DELETED, 404);
    }

    await connection.commit();
    return {message: 'Tag deleted'};
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  fetchAllTags,
  fetchPostsByTagId,
  postTag,
  fetchTagsByPostId,
  deleteTag,
};
