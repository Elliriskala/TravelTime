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

// list of comments
const commentListGet = async (
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

// list of comments by post id
const commentListByPostIdGet = async (
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
const commentListByUserGet = async (
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

// list of comments count by post id
const commentCountByPostIdGet = async (
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

// Get a comment by id
const commentGet = async (
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

// Post a new comment
const commentPost = async (
  req: Request<{}, {}, {comment_text: string; post_id: string}>,
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

// Delete a comment
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
  commentListGet,
  commentListByPostIdGet,
  commentListByUserGet,
  commentCountByPostIdGet,
  commentGet,
  commentPost,
  commentDelete,
};
