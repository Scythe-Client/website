import jwt from 'jsonwebtoken';
import { ENV } from './env';

export const signToken = (payload: object) => {
    return jwt.sign(payload, ENV.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, ENV.JWT_SECRET!);
    } catch (error) {
        return null;
    }
};