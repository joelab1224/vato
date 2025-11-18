import { NextRequest, NextResponse } from 'next/server';
import { DatabaseFactory } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (sessionToken) {
      const db = DatabaseFactory.getRelationalDB();
      // Invalidate session
      await db.query('DELETE FROM auth_sessions WHERE session_token = $1', [sessionToken]);
    }

    const response = NextResponse.json({ success: true });
    
    // Clear session cookie
    response.cookies.set('session_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}