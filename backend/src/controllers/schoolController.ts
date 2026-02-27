import { Request, Response } from 'express';
import db from '../config/db';
export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM schools');
    res.status(200).json({
      status: 'success',
      results: (rows as any[]).length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};