import express from 'express';
import {
  getAllPosts,
  getPostsByTagId,
  getPostsByUserId,
  getPostByPostId,
  getPostsByDestination,
  postTravelPosts,
  putTravelPosts,
  deleteTravelPosts,
  getMostLikedPosts,
} from '../controllers/travelPostController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

// route to get all posts and post a travel post
router
  .route('/')
  .get(validationErrors, getAllPosts)
  .post(
    authenticate,
    body('media_url')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[\w.-]+$/)
      .escape(),
    body('media_type').trim().notEmpty().isMimeType(),
    body('continent')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('country')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('city')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('start_date').trim().isISO8601().toDate(),
    body('end_date').trim().isISO8601().toDate(),
    body('description')
      .trim()
      .notEmpty()
      .isString()
      .isLength({max: 300})
      .escape(),
    validationErrors,
    postTravelPosts,
  );

// route to get all posts based on a user id
router.route('/byuser/:user_id').get(getPostsByUserId);

// route to get a post based on its id, update and delete a travel post
router
  .route('/:post_id')
  .get(
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    getPostByPostId,
  )
  .put(
    authenticate,
    param('post_id').isInt({min: 1}).toInt(),
    body('media_url')
      .trim()
      .notEmpty()
      .isString()
      .matches(/^[\w.-]+$/)
      .escape(),
    body('media_type').trim().notEmpty().isMimeType(),
    body('continent')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('country')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('city')
      .trim()
      .notEmpty()
      .isString()
      .isLength({min: 3, max: 50})
      .escape(),
    body('start_date').trim().isISO8601().toDate(),
    body('end_date').trim().isISO8601().toDate(),
    body('description')
      .trim()
      .notEmpty()
      .isString()
      .isLength({max: 300})
      .escape(),
    validationErrors,
    putTravelPosts,
  )
  .delete(
    authenticate,
    param('post_id').isInt({min: 1}).toInt(),
    validationErrors,
    deleteTravelPosts,
  );

// route to get all posts based on a tag id
router
  .route('/bytag/:tag_id')
  .get(
    param('tag_id').isInt({min: 1}).toInt(),
    validationErrors,
    getPostsByTagId,
  );

// route to get all posts based on a destination
router
  .route('/bydestination/:filterValue')
  .get(
    param('filterValue').isString().isLength({min: 3, max: 50}).escape(),
    validationErrors,
    getPostsByDestination,
  );

// route to get the most liked posts
router.route('/mostliked').get(getMostLikedPosts);

export default router;
