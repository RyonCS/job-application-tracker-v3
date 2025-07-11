import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
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
  if (req.isAuthenticated()) {
    await new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  }

  const { emailAddress, password } = req.body;
  try {
    // Check if a user with the same email already exists.
    const existingUser = await prisma.user.findUnique({
      where: { emailAddress },
    });

    // Redirect to login page if email is already registered.
    if (existingUser) {
      console.log('Existing user found.');
      return res.status(409).json({error:'An account with this email address already exists.'});
    }

    // Hash the plain-text password before storing it.
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    try {
      // Create a new user record in the database.
      newUser = await prisma.user.create({
        data: {
          emailAddress,
          passwordHash: hashedPassword,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({error : 'Failed to create new user.'});
    }
    

    req.login(newUser, (err) => {
      if (err) {
        console.log('Login error after registration:', err);
        return res.status(500).json({error: 'Failed to establish a session after registering user.'});
      }
      return res.status(200).json({message:'Successfully registered user.'});
    });

  } catch (err) {
    console.log('Error', err);
    // Redirect back to login page on error.
    return res.status(500).json({error:'An unexpected error occurred.'});
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
  if (req.isAuthenticated()) {
    await new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) reject(err);
        else resolve(null);
      });
    });
  }

  try {
    // Authenticate user using Passport's local strategy.
    passport.authenticate('local', (err: Error, authenticatedUser: any) => {
      if (err || !authenticatedUser) {
        console.log('Failed to authenticate user.');
        return res.status(401).json({ error: 'Invalid Credentials or authentication failed.'})
      }

      // Log in the authenticated user (establish session).
      req.login(authenticatedUser, (err: Error) => {
        if (err) {
          console.log('Failed to log in.');
          return res.status(500).json( {error:'Failed to establish a session.'});
        }
        return res.status(200).json({message:'Login Successful.'})
      });
    })(req, res); // Immediately invoke the passport middleware with req, res.
  } catch (err) {
    console.log('Error during login process:', err);
    return res.status(500).json({error:'An unexpected error occurred during login.'})
  }
};

/**
 * Logs out the user by calling Passport's logout method and destroying the session.
 *
 * @param req - Express request object containing the user's session and Passport methods
 * @param res - Express response object used to send redirects or error responses
 * @returns Redirects to the login page after successful logout,
 *          or sends a 500 error if session destruction fails
 */
export const logOut = (req: Request, res: Response) => {
  // Call Passport's logout to remove user info from the session.
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Could not log out.");
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error", err);
        return res.status(500).send("Could not log out.");
      }

      res.status(200).json({message:'Successfully logged out user.'});
    });
  });
};
