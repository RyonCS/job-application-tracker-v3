import express from 'express';
import { ensureAuthenticated } from '../../middleware/security-middleware';
import rateLimit from 'express-rate-limit';
import {
  getAllApplications,
  addNewApplication,
  editApplication,
  deleteApplication,
} from '../../controllers/applications-controller';

const router = express.Router();
router.use(ensureAuthenticated);

const addApplicationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 submissions per minute
  message: 'Too many job applications submitted, please try again later.',
});

/**
 * -- Application Routes --
 * This router handles all routes related to managing job applications:
 * - Listing all applications
 * - Adding a new application
 * - Editing or deleting existing applications
 *
 * These routes are used for server-side rendered pages with form submissions.
 */

/**
 * GET /applications/my-applications
 * Renders a page displaying all job applications for the logged-in user.
 */
router.get('/', getAllApplications);

/**
 * POST /applications/my-applications
 * Handles form submission for adding a new job application.
 * Saves the new application to the database.
 */
router.post('/', addApplicationLimiter, addNewApplication);

/**
 * PUT /applications/my-applications/:id
 * Handles submission of edits to an existing application.
 * Updates the application data in the database.
 */
router.put('/:id', editApplication);

/**
 * DELETE /applications/my-applications/:id
 * Deletes a specific job application by ID from the database.
 */
router.delete('/:id', deleteApplication);

export default router;
