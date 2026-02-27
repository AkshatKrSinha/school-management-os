import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Essential for reading JSON data from the frontend

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'success', 
    message: 'Ether School OS Backend is active and breathing.' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});