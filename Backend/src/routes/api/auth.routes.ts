import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  login,
  register,
  logout,
} from '../../controllers/auth-controller';

const router = express.Router();

// Sets the number of login or register requests to prevent spam.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 5 requests per windowMs
  message: 'Too many attempts from this IP, please try again after 15 minutes',
});

const logoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many logout attempts. Calm down.',
});

/**
 * -- Authentication Routes --
 * This router handles all routes related to user authentication:
 * rendering login/register pages, handling form submissions for login/register,
 * and logging out users.
 */

/**
 * POST /auth/register
 * Handle registration form submission:
 * Create a new user in the database and start a session.
 */
router.post('/register', authLimiter, register);

/**
 * POST /auth/login
 * Handles login form submission:
 * Authenticate user credentials and create a session if successful.
 */
router.post('/login', authLimiter, login);

router.post('/logout', logoutLimiter, logout);

export default router;
