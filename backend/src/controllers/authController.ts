import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';

// 1. Register a new School Admin
export const registerAdmin = async (req: Request, res: Response) => {
  const { school_id, full_name, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUser]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ status: 'error', message: 'Email already registered' });
    }

    // Scramble the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert into database
    await db.query(
      'INSERT INTO users (school_id, full_name, email, password_hash, user_role) VALUES (?, ?, ?, ?, ?)',
      [school_id, full_name, email, passwordHash, 'admin']
    );

    res.status(201).json({ status: 'success', message: 'Admin registered successfully' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// 2. Login and Issue Token
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Compare the "scrambled" password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Create the "ID Card" (JWT)
    // We use 'as string' to tell TypeScript: "Trust me, I've defined this in my .env file."
    const token = jwt.sign(
        { 
            user_id: user.id, 
            school_id: user.school_id, 
            role: user.user_role 
        },
    process.env.JWT_SECRET as string, 
        { 
        // We cast this to 'any' or provide a fallback string to satisfy the library's strict options type
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || '24h' 
        }
    );

    res.status(200).json({
      status: 'success',
      token,
      user: { id: user.id, name: user.full_name, school_id: user.school_id }
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};