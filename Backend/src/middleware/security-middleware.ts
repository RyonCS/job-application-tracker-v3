import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (!decodedToken.id) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    const user = await prisma.user.findUnique({ where: { id: decodedToken.id }});
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    return next();
    
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
