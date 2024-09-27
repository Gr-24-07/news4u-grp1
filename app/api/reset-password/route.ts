import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { validateAndConsumeResetToken } from "@/utils/token";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const { email, isValid } = await validateAndConsumeResetToken(token);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    // TODO: Add logic here to invalidate all user sessions if needed

    return NextResponse.json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred during password reset, please contact our support.",
      },
      { status: 500 }
    );
  }
}
