import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

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
export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Missing auth token'});
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (!decodedToken.id) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    const user = await prisma.user.findUnique({ where: { id: decodedToken.id }});
    if (!user) return res.status(401).json({ error: 'User not found '});

    req.user = user;
    return next();
    
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token'});
  }
}