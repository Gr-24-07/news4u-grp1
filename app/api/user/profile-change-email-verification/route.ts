import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAndConsumeResetToken } from "@/utils/token";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const { email: tokenData, isValid } = await validateAndConsumeResetToken(token);
    
    if (!isValid) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const [userId, newEmail] = tokenData.split(':');

    if (!userId || !newEmail) {
      return NextResponse.json({ error: "Invalid token data" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/profile?emailChanged=true`);
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ error: "An error occurred during email verification" }, { status: 500 });
  }
}