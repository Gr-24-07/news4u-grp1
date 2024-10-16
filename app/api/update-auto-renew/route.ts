import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { userId, autoRenew } = await request.json();

    const updatedSubscription = await prisma.subscription.update({
      where: {
        userId: userId,
      },
      data: {
        autoRenew: autoRenew,
      },
    });

    if (!updatedSubscription) {
      return NextResponse.json(
        { success: false, error: "Subscription not found" },
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
