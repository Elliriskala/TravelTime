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

// get all likes
const likeListGet = async (
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

// get all likes based on a post id, so that the likes can be shown on a post
const likeListByPostIdGet = async (
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

// get all likes based on a user id, so that all the posts user has liked can be displayed in their profile
const likeListByUserIdGet = async (
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

// like a post
const likePost = async (
  req: Request<{}, {}, {post_id: string}>,
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

// unlike a post
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

// Fetch likes count by post id, so that the amount of likes can be displayed in a post and also the most liked posts can be filtered
const likeCountByPostIdGet = async (
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
  likeListGet,
  likeListByPostIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByPostIdGet,
};
