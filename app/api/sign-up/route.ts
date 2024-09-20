import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { createVerificationToken } from "@/utils/token";
import { sendVerificationEmail } from "@/utils/email";
import { z } from "zod";

// Define a schema for input validation
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  newsletter: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const { email, password, firstName, lastName, dateOfBirth, newsletter } =
      registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        newletter: newsletter || false,
      },
    });

    // Create verification token
    const token = await createVerificationToken(email);

    // Send verification email
    await sendVerificationEmail(email, token, email);

    return NextResponse.json(
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
