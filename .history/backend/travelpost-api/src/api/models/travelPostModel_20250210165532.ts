import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {TravelPost} from 'hybrid-types/DBTypes';
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
    user_id,
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
    post_id,
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
  const [newPost] = await promisePool.execute<ResultSetHeader>(`
    INSERT INTO TravelPosts (user_id, title, content, continent, country, city, date)`);
}

export {
  fetchAllTravelPosts,
  fetchTravelPostsByUserId,
  fetchTravelPostByPostId,
  fetchPostsByDestination,
  fetchPostsByTagId,
};
