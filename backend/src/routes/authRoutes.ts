import express from 'express';
import { registerAdmin, login } from '../controllers/authController';

const router = express.Router();

// Route for new Admin Sign-ups
// URL: POST http://localhost:5000/api/auth/register
router.post('/register', registerAdmin);

// Route for Admin Login
// URL: POST http://localhost:5000/api/auth/login
router.post('/login', login);

export default router;