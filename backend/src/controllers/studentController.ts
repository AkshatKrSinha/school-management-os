import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import db from '../config/db';

// 1. Add a New Student
export const addStudent = async (req: AuthRequest, res: Response) => {
  const { first_name, middle_name, last_name, aadhaar_id, classroom_id } = req.body;
  const school_id = req.user?.school_id; // Automatically get school_id from token

  try {
    // Insert student into the database
    // aadhaar_id is unique and 12 chars per our schema 
    await db.query(
      'INSERT INTO students (school_id, classroom_id, first_name, middle_name, last_name, aadhaar_id) VALUES (?, ?, ?, ?, ?, ?)',
      [school_id, classroom_id || null, first_name, middle_name || null, last_name || null, aadhaar_id]
    );

    res.status(201).json({
      status: 'success',
      message: 'Student added successfully'
    });
  } catch (error: any) {
    // Handle duplicate Aadhaar IDs or other DB errors
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. Get All Students for the Logged-in School
export const getMyStudents = async (req: AuthRequest, res: Response) => {
  const school_id = req.user?.school_id;

  try {
    const [rows] = await db.query('SELECT * FROM students WHERE school_id = ?', [school_id]);
    
    res.status(200).json({
      status: 'success',
      results: (rows as any[]).length,
      data: rows
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};