import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { generateResetToken } from "@/utils/token";
import { sendEmailChangeVerification } from "@/utils/email";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newEmail, password } = await req.json();

  // Validate input
  if (!newEmail || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Check if new email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Generate and store verification token
    const token = await generateResetToken(`${user.id}:${newEmail}`);

    // Send verification email
    await sendEmailChangeVerification(newEmail, token);

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error changing email:", error);
    return NextResponse.json(
      { error: "An error occurred while changing email" },
      { status: 500 }
    );
  }
}
