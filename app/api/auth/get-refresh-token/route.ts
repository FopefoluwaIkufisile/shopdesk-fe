import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const cookies = req.headers.get('cookie');

  if (!cookies || !cookies.includes('refresh_token=')) {
    return NextResponse.json(
      { error: 'No refresh token found' },
      { status: 401 }
    );
  }

  // Extract refresh_token manually
  const refreshToken = cookies
    .split('; ')
    .find((row) => row.startsWith('refresh_token='))
    ?.split('=')[1];

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    );
  }

  return NextResponse.json({ refresh_token: refreshToken });
}
