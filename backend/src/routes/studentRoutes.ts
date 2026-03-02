import express from 'express';
import { addStudent, getMyStudents } from '../controllers/studentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Both routes are protected by the Bouncer
router.post('/', protect, addStudent);
router.get('/', protect, getMyStudents);

export default router;