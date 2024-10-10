import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  console.log("GET /api/user/profile-current-email called");

  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("Fetching user with ID:", session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User email found:", user.email);
    return NextResponse.json({ email: user.email });
  } catch (error) {
    console.error("Error fetching current email:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the email" },
      { status: 500 }
    );
  }
}
