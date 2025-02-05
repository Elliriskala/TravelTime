import {Request, Response, NextFunction} from 'express';
import {
  fetchAllLikes,
  fetchLikesByPostId,
  fetchLikesByUserId,
  postLike,
  deleteLike,
  fetchLikesCountByPostId,
} from '../models/likeModel';
import {MessageResponse} from 'hybrid-types/MessageTypes';
import {Like, TokenContent} from 'hybrid-types/DBTypes';

/**
 * Get all likes
 * @param req
 * @param res
 * @param next
 */
const getAllLikes = async (
  req: Request,
  res: Response<Like[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchAllLikes();
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

/**
 * get all likes based on a post id, so that the likes can be shown on a post
 * @param req
 * @param res
 * @param next
 */
const getAllLikesByPostId = async (
  req: Request<{post_id: string}>,
  res: Response<Like[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchLikesByPostId(Number(req.params.post_id));
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

/**
 * et all likes based on a user id, so that all the posts user has liked can be displayed in their profile
 * @param req
 * @param res
 * @param next
 */
const getAllLikesByUserId = async (
  req: Request<{user_id: string}>,
  res: Response<Like[]>,
  next: NextFunction,
) => {
  try {
    const likes = await fetchLikesByUserId(Number(req.params.user_id));
    res.json(likes);
  } catch (error) {
    next(error);
  }
};

/**
 * like a post
 * @param req
 * @param res
 * @param next
 */
const likePost = async (
  req: Request<object, object, {post_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await postLike(
      Number(req.body.post_id),
      res.locals.user.user_id,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * unlike a post
 * @param req
 * @param res
 * @param next
 */
const likeDelete = async (
  req: Request<{post_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await deleteLike(
      Number(req.params.post_id),
      res.locals.user.user_id,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Fetch likes count by post id, so that the amount of likes can be displayed in a post and also the most liked posts can be filtered
 * @param req
 * @param res
 * @param next
 */
const getLikesCountByPostId = async (
  req: Request<{post_id: string}>,
  res: Response<{count: number}>,
  next: NextFunction,
) => {
  try {
    const count = await fetchLikesCountByPostId(Number(req.params.post_id));
    res.json({count});
  } catch (error) {
    next(error);
  }
};

export {
  getAllLikes,
  getAllLikesByPostId,
  getAllLikesByUserId,
  likePost,
  likeDelete,
  getLikesCountByPostId,
};
