import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token is missing' },
        { status: 401 }
      );
    }

    const response = await fetch(
      'https://api.timbu.cloud/auth/refresh-access-token',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: `refresh_token=${refreshToken};`,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to refresh access token' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const { access_token } = data;
    const isProduction = process.env.NODE_ENV === 'production';

    // Set new access token cookie
    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 15 minutes
    });

    return NextResponse.json({ access_token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
