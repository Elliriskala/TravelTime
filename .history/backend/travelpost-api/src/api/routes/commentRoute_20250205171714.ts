import express from 'express';
import {
  commentListGet,
  commentListByPostIdGet,
  commentListByUserGet,
  commentCountByPostIdGet,
  commentGet,
  commentPost,
  commentDelete,
} from '../controllers/commentController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(commentListGet)
  .post(
    authenticate,
    body('comment_text')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 1, max: 200})
      .escape(),
    body('post_id').notEmpty().isInt({min: 1}).toInt(),
    validationErrors,
    commentPost,
  );

router
  .route('/bypost/:id')
  .get(
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    commentListByPostIdGet,
  );

router.route('/byuser').get(authenticate, commentListByUserGet);

router
  .route('/count/:post_id')
  .get(
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    commentCountByPostIdGet,
  );

router
  .route('/:comment_id')
  .get(param('comment_id').isInt({min: 1}).toInt(), validationErrors, commentGet)
  .delete(
    authenticate,
    param('comment_id').isInt({min: 1}).toInt(),
    validationErrors,
    commentDelete,
  );

export default router;
