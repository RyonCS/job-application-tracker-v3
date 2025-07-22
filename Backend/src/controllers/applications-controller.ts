import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseApplicationQueryParams } from '../utils/queryParser';
import { getApplicationSummary, normalizeEnum } from '../helpers/helperFunctions';

const prisma = new PrismaClient();

/**
 * Fetch all job applications for the currently logged-in user.
 * 
 * @param req - The Express request object, containing user info and query params.
 * @param res - The Express response object, used to send data or errors back to the client.
 * 
 * This function:
 * 1. Checks if a user is logged in by looking for `req.user.id`.
 * 2. If no user is logged in, responds with a 401 Unauthorized error and stops.
 * 3. Parses query parameters to filter, sort, and search applications.
 * 4. Queries the database to get the user's matching job applications.
 * 5. Sends the applications and query info as a JSON response.
 * 6. Handles any database errors and responds with a 500 error if needed.
 * 
 *  @returns Sends a JSON response with the user's job applications and query info,
 *           or an error response if unauthorized or on failure.
 */
export const getAllApplications = async (req: Request, res: Response) => {
  // Get the user's ID from the session.
  const userId = req.user?.id;

  // If no user is logged in, redirect to login page.
  if (!userId) { return res.status(401).json({error: 'Unauthorized.'}); }

  // Parse sorting, filtering, and searching options from the query parameters.
  const { where, orderBy, sort, filter } = parseApplicationQueryParams(
    req.query,
    userId,
  );

  try {
    // Query the database for all matching job applications belonging to the user.
    const applications = await prisma.jobApplication.findMany({
      where,
      orderBy,
    });

    // Render the EJS view for displaying the user's applications.
    return res.status(200).json({ applications, sort, filter });
  } catch (err) {
    console.error(err);
    res.status(500).json({error : 'Failed to fetch applications.'});
  }
};

export const getApplicationsSummary = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const jobApplications = await prisma.jobApplication.findMany({ where: { userId }});

    const applicationSummary = getApplicationSummary(jobApplications);
    console.log(applicationSummary);
    return res.status(200).json({applicationSummary});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not get summary'});
  }
}

/**
 * Handles the creation of a new job application for a logged-in user.
 * @param req - Express request object containing form data in req.body and user info in req.user.
 * @param res - Express response object used to redirect the user after the new application is saved.
 * @returns Sends a JSON response with a success message,
 *         or an error response if unauthorized or on failure.
 */
export const addNewApplication = async (req: Request, res: Response) => {
  // Get the logged-in user's ID from the session (populated by Passport).
  const userId = req.user?.id;

  // Destructure specific fields from the request body.
  const { applicationDate, workMode, status, ...data } = req.body;

  // Convert the submitted application date string into a Date object,
  // or default to the current date if none was provided.
  let parsedDate = new Date();
  if (applicationDate) {
    parsedDate = new Date(applicationDate);
    if (isNaN(parsedDate.getTime())) {
      // fallback if invalid
      parsedDate = new Date();
    }
  }

  try {
    // Create a new job application record in the database.
      const newApp = await prisma.jobApplication.create({
        data: {
          ...data, // Include all other form fields (e.g., company, position, location).
          applicationDate: parsedDate,
          userId,
          workMode: normalizeEnum(workMode),
          status: normalizeEnum(status),
        },
      });

    res.status(201).json({message: 'Application successfully created.', newApp});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to create new application.'});
  }
};

/**
 * Handles editing an existing job application by ID.
 * - Verifies the application exists and belongs to the currently logged-in user.
 * - Updates the application with values from the request body.
 * - Redirects to the applications dashboard in all cases (success or unauthorized).
 *
 * @param req - Express request object containing the application ID in req.params,
 *              user session data in req.user, and updated form data in req.body.
 * @param res - Express response object used to redirect after update or on error.
 * @returns Sends a JSON response with a success message,
 *          or an error response if unauthorized or on failure.
 */
export const editApplication = async (req: Request, res: Response) => {
  // Get current user's ID from session (via Passport)
  const userId = req.user?.id;

  // Get application ID from route parameters.
  const { id } = req.params;

  let application;
  // Look up the existing application by its ID.
  try { application = await prisma.jobApplication.findUnique({ where: { id } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({error : 'Database error.'});
  }

  // If the application does not exist or does not belong to the current user,
  // prevent unauthorized access by redirecting back to the dashboard.
  if (!application) { return res.status(404).json({error : 'Application not found.'}); }
  if (application.userId !== userId) { return res.status(403).json({error : 'Forbidden. You do not have access to this application.'}); }

  // Extract fields from the request body.
  const { applicationDate, workMode, status } = req.body;

  // Parse and normalize date.
  let parsedDate = new Date();
  if (applicationDate) {
    parsedDate = new Date(applicationDate);
    if (isNaN(parsedDate.getTime())) {
      parsedDate = new Date();
    } else {
      const now = new Date();
      parsedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    }
  }

  try {
    // Update the application with the new data.
    await prisma.jobApplication.update({
      where: { id },
      data: {
        ...req.body,
        applicationDate: parsedDate,
        workMode: normalizeEnum(workMode),
        status: normalizeEnum(status),
      },
    });

    // Redirect back to the user's applications dashboard after update.
    res.status(200).json({message: 'Application successfully updated.'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to update application.'});
  }
};

/**
 * Deletes a specific job application by its ID.
 *
 * @param req - Express request object containing the application ID in the route parameters
 * @param res - Express response object used to redirect the user after deletion
 * @returns Sends a JSON response indicating success or failure of deletion.
 */
export const deleteApplication = async (req: Request, res: Response) => {
  // Extract the application ID from the route parameters.
  const { id } = req.params;
  const userId = req.user?.id;

  // Look up the application in the database.
  let application;
  try {
    application = await prisma.jobApplication.findUnique({ where: { id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error : 'Failed to fetch application.'});
  }
  

  // If application doesn't exist or doesn't belong to the logged-in user, deny access.
  if (!application) { return res.status(404).json({ error: "Could not find application."})}

  if (application.userId !== userId) { return res.status(403).json({error: 'Forbidden. You do not have access to this application.'})}

  // If everything checks out, delete the application.
  try {
    await prisma.jobApplication.delete({ where: { id } });
      return res.status(200).json({message : 'Successfully deleted application.'});
  } catch (err) {
      console.error(err);
      res.status(500).json({error: 'Failed to delete jobApplication'});
  }
};
