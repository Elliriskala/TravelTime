import bcrypt from 'bcryptjs';
import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {UserDeleteResponse, UserResponse} from 'hybrid-types/MessageTypes';
import {TokenContent, User, UserWithNoPassword} from 'hybrid-types/DBTypes';
import {
  fetchAllUsers,
  fetchUserById,
  fetchUsername,
  fetchEmail,
  createUser,
  updateUser,
  deleteUser,
} from '../models/userModel';

const salt = bcrypt.genSaltSync(10);

/**
 * Get all users
 * @param req
 * @param res
 * @param next
 */
const getAllUsers = async (
  req: Request,
  res: Response<UserWithNoPassword[]>,
  next: NextFunction,
) => {
  try {
    const allUsers = await fetchAllUsers();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by their id
 * @param req
 * @param res
 * @param next
 */
const getUserById = async (
  req: Request<{user_id: string}>,
  res: Response<UserWithNoPassword>,
  next: NextFunction,
) => {
  try {
    const singleUser = await fetchUserById(Number(req.params.user_id));
    console.log(singleUser);
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new user
 * @param req
 * @param res
 * @param next
 * @returns new user
 */

const postNewUser = async (
  req: Request<object, object, User>,
  res: Response<UserResponse>,
  next: NextFunction,
) => {
  try {
    const {username, email, password_hash} = req.body;

    // check if the username already exists
    const existingUsername = await fetchUsername(username);
    if (existingUsername) {
      return next(new CustomError('Username already exists', 400));
    }

    // check if the email already exists
    const existingEmail = await fetchEmail(email);
    if (existingEmail) {
      return next(new CustomError('Email already exists', 400));
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password_hash, salt);

    // create the user
    const newUser = await createUser({
      username,
      email,
      password_hash: hashedPassword,
    });

    console.log(newUser);

    if (!newUser) {
      next(new CustomError('User not created', 500));
      return;
    }
    // successfully created user response
    const response: UserResponse = {
      message: 'user created',
      user: newUser,
    };
    res.json(response);
  } catch {
    next(new CustomError('Duplicate entry', 400));
  }
};

/**
 * Update an user
 * @param req
 * @param res
 * @param next
 * @returns updated user
 */
const userUpdate = async (
  req: Request<object, object, User>,
  res: Response<UserResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const userFromToken = res.locals.user;

    const {username, email, password_hash} = req.body;

    // check if the username or email already exists
    if (username && username !== userFromToken.username) {
      const existingUsername = await fetchUsername(username);
      if (existingUsername) {
        return next(new CustomError('Username already exists', 400));
      }
    }

    if (email && email !== userFromToken.email) {
      const existingEmail = await fetchEmail(email);
      if (existingEmail) {
        return next(new CustomError('Email already exists', 400));
      }
    }

    // hash the password if updated
    if (password_hash) {
      req.body.password_hash = await bcrypt.hash(password_hash, salt);
    }

    console.log(userFromToken);

    // update the user
    const updatedUser = await updateUser(req.body, userFromToken.user_id);
    if (!updatedUser) {
      return next(new CustomError('User not found', 404));
    }
    const response: UserResponse = {
      message: 'User updated successfully',
      user: updatedUser,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @param req
 * @param res
 * @param next
 * @returns user deleted message
 */
const userDelete = async (
  req: Request,
  res: Response<UserDeleteResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const userFromToken = res.locals.user;
    console.log('user from token', userFromToken);

    const result = await deleteUser(userFromToken.user_id);

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete other users as an admin
 * @param req
 * @param res
 * @param next
 * @returns
 */
const userDeleteAsAdmin = async (
  req: Request<{user_id: string}>,
  res: Response<UserDeleteResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    if (res.locals.user.level_name !== 'Admin') {
      next(new CustomError('You are not authorized to do this', 401));
      return;
    }

    const result = await deleteUser(Number(req.params.user_id));

    if (!result) {
      next(new CustomError('User not found', 404));
      return;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Check token
 * @param req
 * @param res
 * @param next
 * @returns success/error message
 */
const checkToken = async (
  req: Request,
  res: Response<UserResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  const userFromToken = res.locals.user;
  // check if user exists in database
  const user = await fetchUserById(userFromToken.user_id);
  if (!user) {
    next(new CustomError('User not found', 404));
    return;
  }

  const message: UserResponse = {
    message: 'Token is valid',
    user: user,
  };
  res.json(message);
};

export {
  getAllUsers,
  getUserById,
  postNewUser,
  userUpdate,
  userDelete,
  userDeleteAsAdmin,
  checkToken,
};
