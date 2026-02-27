import express from 'express';
import { getAllSchools } from '../controllers/schoolController';
const router = express.Router();
router.get('/', getAllSchools);
export default router;