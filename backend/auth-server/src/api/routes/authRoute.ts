import express from 'express';
import {login} from '../controllers/authController';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares';

const router = express.Router();

// route for login
router.post(
  '/login',
  body('username')
    .isString()
    .trim()
    .escape()
    .isLength({min: 3, max: 50})
    .withMessage('Username must be between 3-50 characters'),
  body('password_hash')
    .isString()
    .isLength({min: 5})
    .withMessage('Password must be at least 5 characters long'),
  validationErrors,
  login,
);

export default router;
