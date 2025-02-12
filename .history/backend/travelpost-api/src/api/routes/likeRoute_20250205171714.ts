import express from 'express';
import {
  likeListGet,
  likeListByPostIdGet,
  likeListByUserIdGet,
  likePost,
  likeDelete,
  likeCountByPostIdGet,
} from '../controllers/likeController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(likeListGet)
  .post(
    authenticate,
    body('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likePost,
  );

router
  .route('/bypost/:post_id')
  .get(
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likeListByPostIdGet,
  );

router
  .route('/byuser/:user_id')
  .get(
    authenticate,
    param('id').isInt({min: 1}).toInt(),
    validationErrors,
    likeListByUserIdGet,
  );

router
  .route('/count/:post_id')
  .get(
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likeCountByPostIdGet,
  );

router
  .route('/:post_id')
  .delete(
    authenticate,
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    likeDelete,
  );

export default router;
