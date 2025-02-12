import {Request, Response, NextFunction} from 'express';
import {
  fetchAllComments,
  fetchCommentsByPostId,
  fetchCommentsCountByPostId,
  fetchCommentsByUserId,
  fetchCommentById,
  postComment,
  deleteComment,
} from '../models/commentModel';
import {MessageResponse} from 'hybrid-types/MessageTypes';
import {Comment, TokenContent} from 'hybrid-types/DBTypes';

/**
 * get all comments
 * @param req
 * @param res
 * @param next
 */
const getAllComments = async (
  req: Request,
  res: Response<Comment[]>,
  next: NextFunction,
) => {
  try {
    const comments = await fetchAllComments();
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

/**
 * get commenst based on post id
 * @param req
 * @param res
 * @param next
 */
const getAllCommentsByPostId = async (
  req: Request<{post_id: string}>,
  res: Response<Comment[]>,
  next: NextFunction,
) => {
  try {
    const comments = await fetchCommentsByPostId(Number(req.params.post_id));
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// list of comments by user id
/**
 * get comments based on user id
 * @param req
 * @param res
 * @param next
 */
const getAllCommentsByUserId = async (
  req: Request,
  res: Response<Comment[], {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const comments = await fetchCommentsByUserId(
      Number(res.locals.user.user_id),
    );
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

/**
 * count the comments on a post
 * @param req
 * @param res
 * @param next
 */
const getCommentCountByPostId = async (
  req: Request<{post_id: string}>,
  res: Response<{count: number}>,
  next: NextFunction,
) => {
  try {
    const count = await fetchCommentsCountByPostId(Number(req.params.post_id));
    res.json({count});
  } catch (error) {
    next(error);
  }
};

/**
 * get a comment by its id
 * @param req
 * @param res
 * @param next
 */
const getComment = async (
  req: Request<{comment_id: string}>,
  res: Response<Comment>,
  next: NextFunction,
) => {
  try {
    const comment = await fetchCommentById(Number(req.params.comment_id));
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

/**
 * post a new comment
 * @param req
 * @param res
 * @param next
 */
const commentPost = async (
  req: Request<object, object, {comment_text: string; post_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await postComment(
      Number(req.body.post_id),
      res.locals.user.user_id,
      req.body.comment_text,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * delete a comment
 * @param req
 * @param res
 * @param next
 */
const commentDelete = async (
  req: Request<{comment_id: string}>,
  res: Response<MessageResponse, {user: TokenContent}>,
  next: NextFunction,
) => {
  try {
    const result = await deleteComment(
      Number(req.params.comment_id),
      res.locals.user.user_id,
      res.locals.user.level_name,
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllComments,
  getAllCommentsByPostId,
  getAllCommentsByUserId,
  getCommentCountByPostId,
  getComment,
  commentPost,
  commentDelete,
};
