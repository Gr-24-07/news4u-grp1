import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Ensure the logged-in user is only accessing their own data
  if (session.user.id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { newsletter: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ newsletter: user.newsletter });
  } catch (error) {
    console.error("Error fetching newsletter preference:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the newsletter preference" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { userId, newsletter } = body;

  if (!userId || typeof newsletter !== "boolean") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Ensure the logged-in user is only modifying their own data
  if (session.user.id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { newsletter },
    });

    return NextResponse.json({ newsletter: updatedUser.newsletter });
  } catch (error) {
    console.error("Error updating newsletter preference:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the newsletter preference" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "GET, PATCH, OPTIONS",
    },
  });
}
