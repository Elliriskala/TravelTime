import express from 'express';
import {
  getAllUsers,
  getUserById,
  postNewUser,
  userUpdate,
  userDelete,
  userDeleteAsAdmin,
  checkToken,
} from '../controllers/userController';
import {authenticate, validationErrors} from '../../middlewares';
import {body, param} from 'express-validator';

const router = express.Router();

// route to get all users
router.get('/', getAllUsers);

// route to create a new user
router.post(
  '/',
  body('username')
    .trim()
    .escape()
    .isLength({min: 3, max: 50})
    .withMessage('Username must be between 3-50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      'Username can only contain letters, numbers, underscores and dashes',
    ),
  body('password')
    .isString()
    .isLength({min: 5})
    .withMessage('Password must be at least 5 characters long'),
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format'),
  validationErrors,
  postNewUser,
);

// route to update an user
router.put(
  '/',
  authenticate,
  body('username')
    .optional()
    .trim()
    .escape()
    .isLength({min: 3, max: 50})
    .withMessage('Username must be between 3-50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      'Username can only contain letters, numbers, underscores and dashes',
    ),
  body('password')
    .optional()
    .isString()
    .isLength({min: 5})
    .withMessage('Password must be at least 5 characters long'),
  body('email')
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email format'),
  validationErrors,
  userUpdate,
);

// route to delete user
router.delete('/', authenticate, userDelete);

// route to check token
router.get('/token', authenticate, checkToken);

// route to get user by their id
router
  .route('/:user_id')
  .get(param('user_id').isNumeric(), validationErrors, getUserById);

// route to delete user as an admin
router
  .route('/:user_id')
  .delete(
    authenticate,
    param('user_id').isNumeric(),
    validationErrors,
    userDeleteAsAdmin,
  );

export default router;
