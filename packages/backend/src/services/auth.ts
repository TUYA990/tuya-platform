import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { query } from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export const hashPassword = async (password: string) => {
  return bcryptjs.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcryptjs.compare(password, hash);
};

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET as string, { expiresIn: JWT_EXPIRY } as any);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as { userId: string; role: string };
  } catch (error) {
    return null;
  }
};

export const registerUser = async (email: string, password: string, name: string, role: 'driver' | 'passenger') => {
  try {
    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);

    const result = await query(
      'INSERT INTO users (id, email, password, name, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, email, name, role',
      [userId, email, hashedPassword, name, role]
    );

    const token = generateToken(userId, role);
    return { user: result.rows[0], token };
  } catch (error: any) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user.id, user.role);
    return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
  } catch (error: any) {
    throw new Error(`Login failed: ${error.message}`);
  }
};
