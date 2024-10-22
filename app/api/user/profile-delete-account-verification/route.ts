import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import {
  validateAndConsumeResetToken,
  cleanupExpiredTokens,
} from "@/utils/token";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    console.log("Validating token...");
    const { email: userId, isValid } = await validateAndConsumeResetToken(
      token
    );

    if (!isValid) {
      console.log("Token validation failed");
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    console.log("Token validated successfully. User ID:", userId);

    // Fetch user data
    console.log("Fetching user data...");
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User found:", user.id);

    // Cancel subscription if it exists
    if (user.subscription) {
      console.log("Cancelling subscription...");
      await prisma.subscription.update({
        where: { id: user.subscription.id },
        data: {
          expiresAt: new Date(),
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      });
      console.log("Subscription cancelled");
    }

    // Delete user's data
    console.log("Deleting user data...");
    try {
      await prisma.$transaction([
        // First update verification tokens to expired
        prisma.verificationToken.updateMany({
          where: { identifier: user.email },
          data: {
            expires: new Date(Date.now() - 1000), // Set to 1 second ago
          },
        }),
        prisma.session.deleteMany({ where: { userId } }),
        prisma.account.deleteMany({ where: { userId } }),
        prisma.article.deleteMany({ where: { userId } }),
        prisma.subscription.deleteMany({ where: { userId } }),
        prisma.user.delete({ where: { id: userId } }),
      ]);
      console.log("User data deleted successfully");

      // After the transaction completes successfully, clean up the expired tokens
      await cleanupExpiredTokens();
    } catch (deleteError) {
      console.error("Error during data deletion:", deleteError);
      throw deleteError;
    }

    // Set cookie to clear client-side session
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}?accountDeleted=true`
    );
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });

    console.log("Account deletion process completed successfully");
    return response;
  } catch (error: unknown) {
    console.error("Detailed account deletion error:", error);

    let errorMessage = "An error occurred during account deletion";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: "An error occurred during account deletion",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
