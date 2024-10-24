import { authOptions } from "@/lib/api/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export function withAuthSession(handler: Function) {
    return async (req: Request) => {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        return handler(req, session);
    };
}
