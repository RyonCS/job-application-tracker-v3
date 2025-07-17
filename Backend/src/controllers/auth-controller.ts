import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
dotenv.config();

const prisma = new PrismaClient();

/**
 * Registers a new user by creating an account with email and password.
 * @param req - Express request object containing user registration data in req.body.
 * @param res - Express response object used to redirect the client.
 * @return Sends a JSON response with a success message,
 *         or an error response if unauthorized or on failure.
 */
export const register = async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;

  try {
    // Check if a user with the same email already exists.
    const existingUser = await prisma.user.findUnique({ where: { emailAddress }, });
    if (existingUser) return res.status(409).json({ error : 'Email already registered.'});

    // Hash the plain-text password before storing it.
    const passwordHash = await bcrypt.hash(password, 10);

      // Create a new user record in the database.
    const newUser = await prisma.user.create({
        data: { emailAddress, passwordHash, },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    return res.status(200).json({ message : 'User registered', token});

    } catch (err) {
      console.error(err);
      return res.status(500).json({error : 'Failed to create new user.'});
    }
  };

/**
 * Handles user login when username and password are provided.
 *
 * 1. Uses Passport's "local" strategy to authenticate the user.
 * 2. If authentication fails or errors occur, redirects back to the login page.
 * 3. If authentication succeeds, logs the user in using `req.login`.
 * 4. Handles any login errors and redirects back to login if needed.
 * 5. On successful login, redirects the user to their applications dashboard.
 * @param req - Express request object containing user credentials in req.body.
 * @param res - Express response object used to redirect or respond to the client
 * @returns Sends a JSON response with a success message,
 *          or an error response if unauthorized or on failure.
 */
export const login = async (req: Request, res: Response) => {
  const {emailAddress, password} = req.body;

  try {
    const user = await prisma.user.findUnique({where: { emailAddress}});
    if (!user) return res.status(401).json({ error : 'Invalid credentials'});

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error : 'Invalid credentials'});

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!,  {
      expiresIn: '7d',
    })

    return res.status(200).json({ message : 'Login Successful', token});
  } catch (err) {
    console.error('Login Error: ', err);
    return res.status(500).json({ error: 'Internal Server Error'});
  }
};
