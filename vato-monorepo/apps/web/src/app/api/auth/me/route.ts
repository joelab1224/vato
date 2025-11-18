import { NextRequest, NextResponse } from 'next/server';
import { DatabaseFactory } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'No session' }, { status: 401 });
    }

    const db = DatabaseFactory.getRelationalDB();

    // Get session and user
    const session = await db.queryOne(`
      SELECT s.user_id, u.email 
      FROM auth_sessions s 
      JOIN users u ON s.user_id = u.user_id 
      WHERE s.session_token = $1 AND s.expires_at > NOW()
    `, [sessionToken]);

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Update last accessed
    await db.query('UPDATE auth_sessions SET last_accessed_at = NOW() WHERE session_token = $1', [sessionToken]);

    return NextResponse.json({
      user_id: session.user_id,
      email: session.email,
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}