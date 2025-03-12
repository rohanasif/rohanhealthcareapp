import { NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard"];
// Define auth routes where authenticated users shouldn't access
const authRoutes = ["/auth/signin", "/auth/register"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If trying to access protected routes without authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // If trying to access auth routes while authenticated
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
