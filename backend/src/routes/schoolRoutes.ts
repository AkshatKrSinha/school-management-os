import express from 'express';
import { getAllSchools } from '../controllers/schoolController';
import { protect } from '../middleware/authMiddleware'; // Import the Bouncer

const router = express.Router();

// Now, the Bouncer (protect) stands in front of the data
router.get('/', protect, getAllSchools);
export default router;