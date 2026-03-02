import express, { Request, Response } from 'express';
import cors from 'cors';
import './config/db';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for reading JSON data from the frontend
app.use('/api/schools', schoolRoutes);
app.use('/api/auth', authRoutes); // This activates the authorization routes
app.use('/api/students', studentRoutes);

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'success', 
    message: 'Ether School OS Backend is active.' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});