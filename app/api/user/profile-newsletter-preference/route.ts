import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { z } from "zod";

const updateNewsletterSchema = z.object({
  userId: z.string(),
  preference: z.boolean(),
});

export async function POST(req: Request) {
  console.log(
    "Received POST request to /api/user/profile-newsletter-preference"
  );
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      console.log("No session found, returning unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    const { userId, preference } = updateNewsletterSchema.parse(body);

    if (session.user.id !== userId) {
      console.log("User ID mismatch, returning unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Updating user preference in database");
    await prisma.user.update({
      where: { id: userId },
      data: { newsletter: preference },
    });

    console.log("Preference updated successfully");
    return NextResponse.json({
      message: "Newsletter preference updated successfully",
    });
  } catch (error) {
    console.error("Newsletter preference update error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred while updating the newsletter preference" },
      { status: 500 }
    );
  }
}

// Add this to handle OPTIONS requests
export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}
