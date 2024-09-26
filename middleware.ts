import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const LIMIT = 5; // Max number of requests
const WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

const ipRequests = new Map<string, number[]>();

export async function middleware(request: NextRequest) {
  // Rate limiting logic for verify-email
  if (request.nextUrl.pathname === "/api/verify-email") {
    const ip = request.ip ?? "127.0.0.1";
    const now = Date.now();
    const windowStart = now - WINDOW;

    const requestTimestamps = ipRequests.get(ip) || [];
    const requestsInWindow = requestTimestamps.filter(
      (timestamp) => timestamp > windowStart
    );

    if (requestsInWindow.length >= LIMIT) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    requestsInWindow.push(now);
    ipRequests.set(ip, requestsInWindow);
  }

  // Authentication logic
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Define protected routes
  const protectedPaths = ["/admin", "/profile", "/api/protected"];
  const editorPaths = ["/editor"];
  const adminPaths = ["/admin"];

  if (
    !token &&
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // Redirect to login page if accessing protected route without authentication
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Role-based access control
  if (token) {
    if (
      editorPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      token.role !== "EDITOR" &&
      token.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      adminPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      token.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/verify-email",
    "/admin/:path*",
    "/profile/:path*",
    "/api/protected/:path*",
    "/editor/:path*",
    // Add any other paths that should be protected or checked by the middleware
  ],
};
