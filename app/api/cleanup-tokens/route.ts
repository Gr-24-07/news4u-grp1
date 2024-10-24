import { NextResponse } from "next/server";
import { cleanupExpiredTokens } from "@/utils/token";
import { withAuthSession } from "@/utils/withAuthSession";

async function handler() {
    try {
        await cleanupExpiredTokens();
        return NextResponse.json({ message: "Expired tokens cleaned up" });
    } catch (error) {
        console.error("Cleanup error:", error);
        return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
    }
}

export const POST = withAuthSession(handler);
