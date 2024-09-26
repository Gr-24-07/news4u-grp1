import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/utils/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Send the reset email
    await sendPasswordResetEmail(email);

    return NextResponse.json({
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}