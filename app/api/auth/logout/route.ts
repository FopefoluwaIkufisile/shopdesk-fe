import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token')?.value;

    if (!refresh_token) {
      return NextResponse.json(
        { message: 'Refresh token is missing' },
        { status: 400 }
      );
    }

    // Call the external logout API
    const response = await fetch('https://api.timbu.cloud/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Logout failed' },
        { status: response.status }
      );
    }

    // Clear cookies (set an expired date)
    cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });
    cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
    cookieStore.set('selected_organization', '', {
      path: '/',
      expires: new Date(0),
    });

    return NextResponse.json({ message: 'User logged out successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
