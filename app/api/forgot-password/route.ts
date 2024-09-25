import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateResetToken } from "@/utils/token";
import { sendPasswordResetEmail } from "@/utils/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = generateResetToken(email);
      await sendPasswordResetEmail(email, token);
    }

    // Always return a success message to prevent email enumeration
    return NextResponse.json({
      message: "If an account exists, a reset email has been sent.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
