import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LIMIT = 5; // Max number of requests
const WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

const ipRequests = new Map<string, number[]>();

export function middleware(request: NextRequest) {
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

  return NextResponse.next();
}
