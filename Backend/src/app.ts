import dotenv from 'dotenv';
import methodOverride from 'method-override';
import applicationsRoutes from './routes/api/applications.routes';
import authRoutes from './routes/api/auth.routes';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file.
dotenv.config();

// Create an instance of Express application.
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// -- Middleware Setup: --

// Parse URL-encoded bodies (form submission).
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON payloads.
app.use(express.json());

// Enable HTTP method override for supporting "PUT/DELETE" in forms.
app.use(methodOverride('_method'));

// -- Mount route handlers for different app sections: --

// Routes related to job applications.
app.use('/api/v1/applications', applicationsRoutes);

// Routes related to authentication (login, logout, signup).
app.use('/api/v1/auth', authRoutes);

export default app;