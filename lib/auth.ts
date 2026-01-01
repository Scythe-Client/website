import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';
import ClientUser from '@/app/models/ClientUser';

export interface AuthUser {
    userId: string;
    username: string;
}

export const authenticate = async (request: NextRequest): Promise<AuthUser | null> => {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token) as any;

    if (!payload || !payload.userId) {
        return null;
    }

    // Optionally verify user exists
    const user = await ClientUser.findById(payload.userId);
    if (!user) {
        return null;
    }

    return { userId: payload.userId, username: payload.username };
};