import bycrypt from 'bcryptjs';
import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {UserDeleteResponse, UserResponse} from 'hybrid-types/MessageTypes';
import {TokenContent, User, UserWithNoPassword} from 'hybrid-types/DBTypes';
import {
  fetchAllUsers,
  fetchUserById,
  fetchUserByUsername,
  createUser,
  updateUser,
  deleteUser,
} from '../models/userModel';

const salt = bycrypt.genSaltSync(10);

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
