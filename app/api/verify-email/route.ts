import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("API: Received token:", token);

    if (!token) {
      console.log("API: No token provided");
      return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });
    console.log("API: Found verification token:", verificationToken);

    if (!verificationToken) {
      console.log(
        "API: No verification token found in database. Checking for verified user..."
      );
      const verifiedUser = await prisma.user.findFirst({
        where: { emailVerified: { not: null } },
      });

      if (verifiedUser) {
        console.log(
          "API: Found a verified user. Email likely already verified."
        );
        return NextResponse.json(
          { message: "EMAIL_ALREADY_VERIFIED" },
          { status: 200 }
        );
      } else {
        console.log(
          "API: No verified user found. Token may be invalid or expired."
        );
        return NextResponse.json(
          { error: "INVALID_OR_EXPIRED_TOKEN" },
          { status: 400 }
        );
      }
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
    console.log("API: Found user:", user);

    if (!user) {
      console.log(
        "API: No user found with the email associated with the token"
      );
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 400 });
    }

    if (user.emailVerified) {
      console.log("API: User's email is already verified");
      return NextResponse.json(
        { message: "EMAIL_ALREADY_VERIFIED" },
        { status: 200 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
    console.log(
      "API: Updated user's emailVerified status:",
      updatedUser.emailVerified
    );

    try {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
      console.log("API: Deleted verification token");
    } catch (deleteError) {
      if (
        deleteError instanceof Prisma.PrismaClientKnownRequestError &&
        deleteError.code === "P2025"
      ) {
        console.log("API: Verification token already deleted");
      } else {
        throw deleteError;
      }
    }

    return NextResponse.json({ message: "EMAIL_VERIFIED" }, { status: 200 });
  } catch (error) {
    console.error("API: Verification error:", error);
    return NextResponse.json({ error: "VERIFICATION_FAILED" }, { status: 500 });
  }
}
