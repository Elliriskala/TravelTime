import {Request, Response, NextFunction} from 'express';
import {
  fetchAllTravelPosts,
  fetchTravelPostsByUserId,
  fetchTravelPostByPostId,
  fetchTravelPostsByDestination,
  fetchTravelPostsByTagId,
  postTravelPost,
  updateTravelPost,
  deleteTravelPost,
  fetchMostLikedTravelPosts,
} from '../models/travelPostModel';
import {MessageResponse} from 'hybrid-types/MessageTypes';
import {TravelPost, TokenContent} from 'hybrid-types/DBTypes';
import CustomError from '../../classes/CustomError';
import {ERROR_MESSAGES} from '../../utils/errorMessages';

/**
 * get all travel posts
 * @param req
 * @param res
 * @param next
 */

const getAllPosts = async (
  req: Request<object, object>,
  res: Response<TravelPost[]>,
  next: NextFunction,
) => {
  try {
    const allPosts = await fetchAllTravelPosts();
    res.json(allPosts);
  } catch (error) {
    next(error);
  }
};

/**
 * get travelposts based on user id
 * @param req
 * @param res
 * @param next
 */

const getPostsByUserId = async (
  req: Request<{user_id: number}>,
  res: Response<TravelPost[], {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const userid = Number(req.params.user_id) || res.locals.user.user_id;
    if (isNaN(userid)) {
      throw new CustomError(ERROR_MESSAGES.TRAVELPOST.NO_ID, 400);
    }

    const userPosts = await fetchTravelPostsByUserId(userid);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
};

/**
 * get post based on post id
 * @param req
 * @param res
 * @param next
 */

const getPostByPostId = async (
  req: Request<{post_id: string}>,
  res: Response<TravelPost>,
  next: NextFunction,
) => {
  try {
    const postid = Number(req.params.post_id);
    const post = await fetchTravelPostByPostId(postid);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * get posts based on a tag id
 * @param req
 * @param res
 * @param next
 */

const getPostsByTagId = async (
  req: Request<{tag_id: string}>,
  res: Response<TravelPost[]>,
  next: NextFunction,
) => {
  try {
    const tagid = await fetchTravelPostsByTagId(Number(req.params.tag_id));
    res.json(tagid);
  } catch (error) {
    next(error);
  }
};

/**
 * get posts by destination
 * @param req
 * @param res
 * @param next
 */

const getPostsByDestination = async (
  req: Request<{filterValue: string}>,
  res: Response<TravelPost[]>,
  next: NextFunction,
) => {
  try {
    const {filterValue} = req.params;
    const posts = await fetchTravelPostsByDestination(filterValue);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * post a travel post
 * @param req
 * @param res
 * @param next
 */

const postTravelPosts = async (
  req: Request<object, object, TravelPost>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    req.body.user_id = res.locals.user.user_id;

    console.log('Request body:', req.body);
    await postTravelPost(req.body);

    res.json({message: 'Media created'});
  } catch (error) {
    next(error);
  }
};

/**
 * update a travel post
 * @param req
 * @param res
 * @param next
 */

const putTravelPosts = async (
  req: Request<object, object, TravelPost>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const postid = Number(req.body.post_id);
    await updateTravelPost(
      postid,
      req.body,
      res.locals.user.user_id,
      res.locals.user.level_name,
    );
    res.json({message: 'Post updated'});
  } catch (error) {
    next(error);
  }
};

/**
 * delete a travel post
 * @param req
 * @param res
 * @param next
 */

const deleteTravelPosts = async (
  req: Request<{post_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const postid = Number(req.params.post_id);
    await deleteTravelPost(
      postid,
      res.locals.user.user_id,
      res.locals.user.level_name,
    );
    res.json({message: 'Post deleted'});
  } catch (error) {
    next(error);
  }
};

/**
 * get most liked travel posts
 * @param req
 * @param res
 * @param next
 */

const getMostLikedPosts = async (
  req: Request<object, object>,
  res: Response<TravelPost[]>,
  next: NextFunction,
) => {
  try {
    const mostLikedPosts = await fetchMostLikedTravelPosts();
    res.json(mostLikedPosts);
  } catch (error) {
    next(error);
  }
};

export {
  getAllPosts,
  getPostsByTagId,
  getPostsByUserId,
  getPostByPostId,
  getPostsByDestination,
  postTravelPosts,
  putTravelPosts,
  deleteTravelPosts,
  getMostLikedPosts,
};
