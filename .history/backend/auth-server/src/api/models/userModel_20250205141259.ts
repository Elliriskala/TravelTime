import {promisePool} from '../database';
import CustomError from '../../classes/CustomError';
import {UserWithNoPassword, User, UserWithLevel} from 'hybrid-types/DBTypes';
import {RowDataPacket, ResultSetHeader} from 'mysql2';
import {UserDeleteResponse} from 'hybrid-types/MessageTypes';

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

/**
 * Update user info
 * @param user
 * @param id - The ID of the user being updated
 * @returns updated user
 */

const updateUser = async (
  user: Partial<User>,
  id: number,
): Promise<UserWithNoPassword> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // define the fields that can be updated
    const allowedFields = [
      'username',
      'email',
      'password_hash', // if password is updated the hashing is handled in the controller
      'profile_picture',
      'profile_info',
    ];

    const updates = Object.entries(user)
      .filter(([key]) => allowedFields.includes(key))
      .map(([key]) => `${key} = ?`);
    const values = Object.entries(user)
      .filter(([key]) => allowedFields.includes(key))
      .map(([, value]) => value);

    if (updates.length === 0) {
      throw new CustomError('No valid fields to update', 400);
    }

    // check if username or email already exists in the database
    if (user.username) {
      const [existingUsername] = await connection.execute<RowDataPacket[]>(
        `
        SELECT user_id FORM Users WHERE username = ? AND user_id != ?
        `,
        [user.username, id],
      );
      if (existingUsername.length > 0) {
        throw new CustomError('Username already taken', 400);
      }
    }

    if (user.email) {
      const [existingEmail] = await connection.execute<RowDataPacket[]>(
        `SELECT user_id FROM Users WHERE email = ? AND user_id != ?`,
        [user.email, id],
      );
      if (existingEmail.length > 0) {
        throw new CustomError('Email already taken', 400);
      }
    }

    // perform the update query
    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE Users SET ${updates.join(', ')} WHERE user_id = ?`,
      [...values, id],
    );

    if (result.affectedRows === 0) {
      throw new CustomError('User not found', 404);
    }

    // fetch the updated user data (without password)
    const updatedUser = await getUserById(id);

    // if the updates where successful, commit the transaction
    await connection.commit();
    return updatedUser;
  } finally {
    connection.release();
  }
};

/**
 * Delete user by their id
 * @param id
 * @returns message 'daleted user with their id'
 */

const deleteUser = async (id: number): Promise<UserDeleteResponse> => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM Users WHERE user_id = ?;',
      [id],
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      throw new CustomError('User not found', 404);
    }

    return {message: 'User deleted', user: {user_id: id}};
  } finally {
    connection.release();
  }
};

export {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
