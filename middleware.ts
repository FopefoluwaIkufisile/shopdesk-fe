import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const selectedOrganization = req.cookies.get('selected_organization');

  const protectedRoutes = ['/stock', '/sales', '/reports'];
  const authRoutes = ['/sign-in', '/sign-up'];
  const selectOrganizationRoute = '/select-organization';

  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isSelectOrganization = req.nextUrl.pathname === selectOrganizationRoute;

  // if accessing protected routes without a token  you will be redirected to sign-in
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  //  if logged in but you haven't selected an organization you will be redirected to select organization
  if (accessToken && !selectedOrganization && !isSelectOrganization) {
    return NextResponse.redirect(new URL(selectOrganizationRoute, req.url));
  }

  // prevent access to /select-organization if an organization is already selected
  if (accessToken && selectedOrganization && isSelectOrganization) {
    return NextResponse.redirect(new URL('/stock', req.url));
  }

  // if accessing sign-in/sign-up while logged in you will be redirected to appropriate page
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(
      new URL(
        selectedOrganization ? '/stock' : selectOrganizationRoute,
        req.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/stock',
    '/sales',
    '/report',
    '/select-organization',
  ],
};
