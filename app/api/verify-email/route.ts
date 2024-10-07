import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { validateAndConsumeResetToken } from "@/utils/token";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("API: Received token:", token);

    if (!token) {
      console.log("API: No token provided");
      return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
    }

    // Check if it's an email change token
    try {
      const { email: tokenData, isValid } = await validateAndConsumeResetToken(
        token
      );

      if (isValid) {
        console.log("API: Valid email change token");
        const [userId, newEmail] = tokenData.split(":");

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
      console.log(
        "API: Not an email change token, proceeding with regular verification"
      );
    }

    // Regular verification process
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      console.log("API: Invalid or expired token");
      return NextResponse.json(
        { error: "INVALID_OR_EXPIRED_TOKEN" },
        { status: 400 }
      );
    }

    if (new Date() > verificationToken.expires) {
      console.log("API: Token has expired");
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
      return NextResponse.json({ error: "EXPIRED_TOKEN" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      console.log("API: User not found");
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      },
    });

    console.log("API: Email verified successfully");
    return NextResponse.json({ message: "EMAIL_VERIFIED" }, { status: 200 });
  } catch (error) {
    console.error("API: Verification error:", error);
    return NextResponse.json({ error: "VERIFICATION_FAILED" }, { status: 500 });
  }
}
