import {promisePool} from '../database';
import CustomError from '../../classes/CustomError';
import {UserWithNoPassword, User, UserWithLevel} from 'hybrid-types/DBTypes';
import {RowDataPacket, ResultSetHeader} from 'mysql2';

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
 * @param id - user id
 * @returns user and their info without the password
 */
const getUserById = async (id: number): Promise<UserWithNoPassword> => {
  const [rows] = await promisePool.execute<RowDataPacket[] & UserWithLevel[]>(
    `SELECT 
            Users.user_id, 
            Users.username, 
            Users.email, 
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
 * @returns user details without password/userlevel
 */
const getUserByUsername = async (
  username: string,
): Promise<UserWithNoPassword> => {
  const [rows] = await promisePool.execute<
    RowDataPacket[] & UserWithNoPassword[]
  >(
    `SELECT 
            Users.user_id, 
            Users.username, 
            Users.profile_picture, 
            Users.profile_info, 
            Users.created_at
       FROM Users
       WHERE Users.username = ?`,
    [username],
  );
  if (rows.length === 0) {
    throw new CustomError('User not found', 404);
  }
  return rows[0];
};

/**
 * Create a new user
 * @param user
 * @param userLevelId
 * @returns the new created user's id
 */

const createUser = async (
  user: Pick<User, 'username' | 'password_hash' | 'email'>,
  userLevelId = 2,
): Promise<UserWithNoPassword> => {
  const sql = `
    INSERT INTO Users 
        (username, password_hash, email, user_level_id)
    VALUES (?, ?, ?, ?)`;
  const newUser = promisePool.format(sql, [
    user.username,
    user.password_hash,
    user.email,
    userLevelId,
  ]);
  const [result] = await promisePool.execute<ResultSetHeader>(newUser);

  if (result.affectedRows === 0) {
    throw new CustomError('Failed to create user', 500);
  }

  return await getUserById(result.insertId);
};

export {getAllUsers, getUserById, getUserByUsername, createUser};
