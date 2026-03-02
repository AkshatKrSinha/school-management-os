import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include our user data
export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    school_id: number;
    role: string;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Check if the token is in the "Authorization" header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from string "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using our Secret Key
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

      // 3. Attach the user info to the request object
      req.user = {
        user_id: decoded.user_id,
        school_id: decoded.school_id,
        role: decoded.role
      };

      // Move to the next function (the Controller)
      next();
    } catch (error) {
      return res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
  }
};