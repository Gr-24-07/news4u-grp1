import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { createVerificationToken } from "@/utils/token";
import { sendVerificationEmail } from "@/utils/email";
import { apiRegisterSchema } from "@/validators/auth";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            newsletter,
        } = apiRegisterSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstName || null,
                lastName: lastName || null,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                newsletter: newsletter || false, // Changed to match your Prisma schema
            },
        });

        const token = await createVerificationToken(email);
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
