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
  const [rows] = await promisePool.execute<RowDataPacket[]>(
    'SELECT * from TravelPosts'
  );

  if (rows.length === 0) {
    throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NOT_FOUND, 404);
  }
  return [rows] as TravelPost[];
};

export {fetchAllTravelPosts}
