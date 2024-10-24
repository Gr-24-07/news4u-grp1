import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/api/authOptions";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { userId, autoRenew } = await request.json();

        if (userId !== session.user.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 403 }
            );
        }

        const subscription = await prisma.subscription.findUnique({
            where: { userId },
        });

        if (!subscription) {
            return NextResponse.json(
                { success: false, error: "Subscription not found" },
                { status: 404 }
            );
        }

        const updatedSubscription = await prisma.subscription.update({
            where: { userId },
            data: {
                autoRenew,
                ...(autoRenew && subscription.status === "CANCELLED"
                    ? {
                          status: "ACTIVE",
                          cancelledAt: null,
                      }
                    : {}),
            },
        });

        if (!updatedSubscription) {
            return NextResponse.json(
                { success: false, error: "Failed to update subscription" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating auto-renew status:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update auto-renew status" },
            { status: 500 }
        );
    }
}
