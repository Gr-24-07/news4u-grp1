import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { sendAccountDeletionVerification } from "@/utils/email";
import { createVerificationToken } from "@/utils/token";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const verificationToken = await createVerificationToken(user.id);

    // Send verification email
    await sendAccountDeletionVerification(user.email, verificationToken);

    return NextResponse.json({
      message:
        "Account deletion email sent. Please check your email to confirm. Your account and subscription remain active until you confirm deletion.",
    });
  } catch (error) {
    console.error("Account deletion initiation error:", error);
    return NextResponse.json(
      { error: "An error occurred while initiating account deletion" },
      { status: 500 }
    );
  }
}
