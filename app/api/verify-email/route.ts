import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAndConsumeResetToken } from "@/utils/token";

export async function POST(req: Request) {
  try {
    console.log("Entering POST function");
    const body = await req.json();
    console.log("Request body:", body);
    const { token } = body;
    console.log("API: Received token:", token);

    if (!token) {
      console.log("API: No token provided");
      return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
    }

    console.log("Attempting to validate and consume token");
    const { email, isValid, isVerificationToken } =
      await validateAndConsumeResetToken(token);
    console.log("Token validation result:", {
      email,
      isValid,
      isVerificationToken,
    });

    if (!isValid) {
      console.log("API: Invalid token");
      return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
    }

    if (isVerificationToken) {
      // Handle email verification
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        console.log("API: User not found");
        return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });

      console.log("API: Email verified successfully");
      return NextResponse.json({ message: "EMAIL_VERIFIED" }, { status: 200 });
    } else {
      // Handle email change
      const [userId, newEmail] = email.split(":");

      if (!userId || !newEmail) {
        console.log("API: Invalid email change token data");
        return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          email: newEmail,
          emailVerified: new Date(),
        },
      });

      console.log(
        "API: Updated user's email and verified status:",
        updatedUser.email,
        updatedUser.emailVerified
      );
      return NextResponse.json(
        { message: "EMAIL_CHANGED_AND_VERIFIED" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("API: Verification error:", error);
    return NextResponse.json({ error: "VERIFICATION_FAILED" }, { status: 500 });
  }
}
