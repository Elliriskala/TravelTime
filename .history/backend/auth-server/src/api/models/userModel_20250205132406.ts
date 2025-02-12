import {promisePool} from '../database';
import CustomError from '../../classes/CustomError';
import {UserWithNoPassword, User} from 'hybrid-types/DBTypes';
import {RowDataPacket} from 'mysql2';

/**
 * Get all users
 * @returns list of all users (without passwords) or an empty array if no users found
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
 * @param id - The ID of the user being requested
 * @param requestingUserId - The ID of the user making the request
 * @returns user and their info without the password
 */
const getUserById = async (id: number): Promise<UserWithNoPassword> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(
    `SELECT 
            Users.user_id, 
            Users.username, Users.email, 
            Users.profile_picture, 
            Users.profile_info, 
            Users.created_at, 
            UserLevels.level_name
       FROM Users
       JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
       WHERE Users.user_id = ?`,
    [id],
  );
  if (rows.length === 0) {
    throw new CustomError('User not found', 404);
  }
  return rows[0];
};

/**
 * Get user with their username (public search/filtering)
 * @param username
 * @returns user details without password 
 */
const getUserByUsername = async (username: string): Promise<UserWithNoPassword> => {
    const [rows] = await promisePool.execute<RowDataPacket[] & UserWithNoPassword[]>(
      `SELECT Users.user_id, Users.username, Users.password, Users.email, Users.profile_picture, Users.profile_info, Users.created_at, UserLevels.level_name
       FROM Users
       JOIN UserLevels ON Users.user_level_id = UserLevels.level_id
       WHERE Users.username = ?`,
      [username],
    );
    if (rows.length === 0) {
      throw new CustomError('User not found', 404);
    }
    return rows[0];
  };

export {getAllUsers, getUserById, getUserByUsername};
