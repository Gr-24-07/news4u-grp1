import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const LIMIT = 5; // Max number of requests
const WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

const ipRequests = new Map<string, number[]>();

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Rate limiting logic for verify-email
    if (req.nextUrl.pathname === "/api/verify-email") {
      const ip = req.ip ?? "127.0.0.1";
      const now = Date.now();
      const windowStart = now - WINDOW;

      const requestTimestamps = ipRequests.get(ip) || [];
      const requestsInWindow = requestTimestamps.filter(
        (timestamp) => timestamp > windowStart
      );

      if (requestsInWindow.length >= LIMIT) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 }
        );
      }

      requestsInWindow.push(now);
      ipRequests.set(ip, requestsInWindow);

      // Allow the request to proceed without authentication for /api/verify-email
      return NextResponse.next();
    }

    // Role-based access control
    const token = req.nextauth.token;

    if (token) {
      if (
        req.nextUrl.pathname.startsWith("/editor") &&
        token.role !== "EDITOR" &&
        token.role !== "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow unauthenticated access to /api/verify-email
        if (req.nextUrl.pathname === "/api/verify-email") {
          return true;
        }
        // Require authentication for all other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/api/verify-email",
    "/admin/:path*",
    "/profile/:path*",
    "/api/protected/:path*",
    "/editor/:path*",
  ],
};
