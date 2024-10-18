import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAndConsumeResetToken } from "@/utils/token";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const { email: userId, isValid } = await validateAndConsumeResetToken(
      token
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Cancel subscription if it exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (user?.subscription) {
      // Here you would typically call your payment provider's API to cancel the subscription
      // For this example, we'll just mark it as cancelled in our database
      await prisma.subscription.update({
        where: { id: user.subscription.id },
        data: { expiresAt: new Date() }, // Set expiration to now, effectively cancelling it
      });
    }

    // Delete user's data
    await prisma.$transaction([
      prisma.session.deleteMany({ where: { userId } }),
      prisma.account.deleteMany({ where: { userId } }),
      prisma.article.deleteMany({ where: { userId } }),
      prisma.subscription.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}?accountDeleted=true`
    );
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "An error occurred during account deletion" },
      { status: 500 }
    );
  }
}
