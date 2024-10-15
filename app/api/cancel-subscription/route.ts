import { NextResponse } from "next/server";
import { cancelSubscription } from "@/app/actions/subscriptions";

export async function POST(request: Request) {
  const { userId } = await request.json();

  const result = await cancelSubscription(userId);

  if (result.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }
}
