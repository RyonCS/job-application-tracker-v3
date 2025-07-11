import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to ensure the user is authenticated before accessing protected routes.
 * 
 * If the user is authenticated (`req.isAuthenticated()` returns true),
 * the request proceeds to the next middleware or route handler.
 *
 * @param req - Express request object, extended by Passport with isAuthenticated()
 * @param res - Express response object used to redirect the user if unauthenticated
 * @param next - Function to call the next middleware or route handler
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Please log in.' });
}