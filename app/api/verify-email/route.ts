import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("Received token:", token);

    if (!token) {
      console.log("No token provided");
      return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: token,
      },
    });
    console.log("Found verification token:", verificationToken);

    if (!verificationToken) {
      console.log(
        "No verification token found in database. Checking for verified user..."
      );
      const verifiedUser = await prisma.user.findFirst({
        where: {
          emailVerified: {
            not: null,
          },
        },
      });

      if (verifiedUser) {
        console.log("Found a verified user. Email likely already verified.");
        return NextResponse.json(
          { message: "EMAIL_ALREADY_VERIFIED" },
          { status: 200 }
        );
      } else {
        console.log("No verified user found. Token may be invalid or expired.");
        return NextResponse.json(
          { error: "INVALID_OR_EXPIRED_TOKEN" },
          { status: 400 }
        );
      }
    }

    if (new Date() > verificationToken.expires) {
      console.log("Token has expired");
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
    console.log("Found user:", user);

    if (!user) {
      console.log("No user found with the email associated with the token");
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 400 });
    }

    if (user.emailVerified) {
      console.log("User's email is already verified");
      return NextResponse.json(
        { message: "EMAIL_ALREADY_VERIFIED" },
        { status: 200 }
      );
    }

    // Verify the email
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
    console.log(
      "Updated user's emailVerified status:",
      updatedUser.emailVerified
    );

    // Delete the verification token
    try {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
      console.log("Deleted verification token");
    } catch (deleteError) {
      if (
        deleteError instanceof Prisma.PrismaClientKnownRequestError &&
        deleteError.code === "P2025"
      ) {
        console.log("Verification token already deleted");
      } else {
        throw deleteError;
      }
    }

    return NextResponse.json({ message: "EMAIL_VERIFIED" }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "VERIFICATION_FAILED" }, { status: 500 });
  }
}