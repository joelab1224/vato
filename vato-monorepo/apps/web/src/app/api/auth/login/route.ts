import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { DatabaseFactory } from '@/lib/database';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const db = DatabaseFactory.getRelationalDB();

    // Get user
    const user = await db.queryOne(
      'SELECT user_id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    const sessionToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await db.query(
      'INSERT INTO auth_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)',
      [user.user_id, sessionToken, expiresAt]
    );

    const response = NextResponse.json({
      user: {
        user_id: user.user_id,
        email: user.email,
      },
      session_token: sessionToken,
    });

    // Set cookie
    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}