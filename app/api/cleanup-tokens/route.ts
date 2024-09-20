import { NextResponse } from "next/server";
import { cleanupExpiredTokens } from "@/utils/token";

export async function POST(req: Request) {
  try {
    await cleanupExpiredTokens();
    return NextResponse.json({ message: "Expired tokens cleaned up" });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}