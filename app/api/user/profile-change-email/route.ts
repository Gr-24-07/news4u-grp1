import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { createResetToken } from "@/utils/token";
import { sendEmailChangeVerification } from "@/utils/email";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newEmail, password } = await req.json();

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const token = await createResetToken(`${user.id}:${newEmail}`);
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
