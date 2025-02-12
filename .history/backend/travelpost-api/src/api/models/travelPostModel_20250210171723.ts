import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {TravelPost, User, UserLevel} from 'hybrid-types/DBTypes';
import {promisePool} from '../database';
import {MessageResponse} from 'hybrid-types/MessageTypes';
import CustomError from '../../classes/CustomError';
import {ERROR_MESSAGES} from '../../utils/errorMessages';

/**
 * fetch all travelposts
 * @returns - a list of all travel posts
 */

const fetchAllTravelPosts = async (): Promise<TravelPost[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TravelPost[]>(
    'SELECT * from TravelPosts',
  );

  if (rows.length === 0) {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND, 404);
  }
  return rows;
};

/**
 * Fetch all travelposts based on a user id
 * @param id - user id
 * @returns - all the posts based on a user id
 */

const fetchTravelPostsByUserId = async (
  user_id: number,
): Promise<TravelPost[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TravelPost[]>(
    'SELECT * from TravelPosts WHERE user_id = ?',
    [user_id],
  );

  if (rows.length === 0) {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND_USER, 404);
  }
  return rows;
};

/**
 * fetch a travel post based on its id
 * @param id - post_id
 * @returns - travel post by the searched id
 */

const fetchTravelPostByPostId = async (
  post_id: number,
): Promise<TravelPost> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TravelPost[]>(
    'SELECT * from TravelPosts WHERE post_id = ?',
    [post_id],
  );

  if (rows.length === 0) {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND, 404);
  }
  return rows[0];
};

/**
 * Fetch travel posts based on a filter type and value
 * @param filterType - the type of filter (continent, country, city)
 * @param filterValue - the value of the filter
 * @returns - a list of posts based on the filter
 */
const fetchPostsByDestination = async (
  filterType: 'continent' | 'country' | 'city',
  filterValue: string,
): Promise<TravelPost[]> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & TravelPost[]>(
    `SELECT * FROM TravelPosts WHERE ${filterType} = ?`,
    [filterValue],
  );

  if (rows.length === 0) {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND, 404);
  }
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
 * Post a new travel post
 * @param post - the post to be added
 * @returns - success/error message
 */

const postTravelPost = async (post: TravelPost): Promise<MessageResponse> => {
  const {
    user_id,
    media_url,
    media_type,
    continent,
    country,
    city,
    start_date,
    end_date,
    description,
  } = post;

  try {
    const [newPost] = await promisePool.execute<ResultSetHeader>(
      `
      INSERT INTO TravelPosts
      (user_id, media_url, media_type, continent, country, city, start_date, end_date, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        media_url,
        media_type,
        continent,
        country,
        city,
        start_date,
        end_date,
        description,
      ],
    );

    if (newPost.affectedRows === 0) {
      throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_CREATED, 500);
    }
    return {message: 'Travel post added'};
  } catch {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_CREATED, 500);
  }
};

/**
 * Delete a travel post
 * @param post_id - the post to be deleted
 * @param user_id - the user who wants to delete the post
 * @param user_level - the level of the user (admin can delete any post)
 * @returns - success/error message
 * @throws - error if the post is not found
 */

const deleteTravelPost = async (
  post_id: number,
  user_id: number,
  user_level: UserLevel['level_name'],
): Promise<MessageResponse> => {
  const connection = await promisePool.getConnection();
  await connection.beginTransaction();

  try {
    const [post] = await connection.execute<RowDataPacket[] & TravelPost[]>(
      'SELECT * FROM TravelPosts WHERE post_id = ?',
      [post_id],
    );

    if (post.length === 0) {
      throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND, 404);
    }

    if (post[0].user_id !== user_id || user_level !== 'Admin') {
      throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_AUTHORIZED, 403);
    }

    return {message: 'Travel post deleted'};
  } catch {
    await connection.rollback();
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_DELETED, 500);
  } finally {
    connection.release();
  }
};

export {
  fetchAllTravelPosts,
  fetchTravelPostsByUserId,
  fetchTravelPostByPostId,
  fetchPostsByDestination,
  fetchPostsByTagId,
  postTravelPost,
  deleteTravelPost,
};
