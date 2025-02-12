import {promisePool} from '../database';
import CustomError from '../../classes/CustomError';
import {UserWithNoPassword, User} from 'hybrid-types/DBTypes';
import {RowDataPacket} from 'mysql2';

/**
 * Get all users
 * @returns list of all users or an empty array if no users found
 */
const getAllUsers = async (): Promise<UserWithNoPassword[]> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(`
        SELECT 
            Users.user_id, 
            Users.username, 
            Users.email, 
            Users.profile_picture, 
            Users.profile_info, 
            Users.created_at, 
            UserLevels.level_name
        FROM Users
        JOIN UserLevels ON Users.user_level_id = UserLevels.level_id`);

  return rows;
};

/**
 * Get user by their user_id
 * @param id
 * @returns user and their info
 */

export {getAllUsers};
