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

// ===== CORS =====

const allowedOrigins = [
  'https://job-application-tracker-v3.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
})); 

app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// -- Mount route handlers for different app sections: --

// Routes related to job applications.
app.use('/api/v1/applications', applicationsRoutes);

// Routes related to authentication (login, logout, signup).
app.use('/api/v1/auth', authRoutes);

export default app;