import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";

const debugLog = (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
        console.log(
            `%c[EmailAPI] ${message}`,
            "color: #9933ff; font-weight: bold;",
            data ? data : ""
        );
    }
};

export async function GET() {
    debugLog("API call received");

    const session = await getServerSession(authOptions);

    if (!session) {
        debugLog("No session found");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        debugLog("Fetching user", { id: session.user.id });

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { email: true },
        });

        if (!user) {
            debugLog("User not found");
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        debugLog("User email found", { email: user.email });
        return NextResponse.json({ email: user.email });
    } catch (error) {
        debugLog("Error occurred", { error });
        return NextResponse.json(
            { error: "An error occurred while fetching the email" },
            { status: 500 }
        );
    }
}
