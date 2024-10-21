// app/api/check-subscription/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ hasSubscription: false }, { status: 400 });
  }

  try {
    const subscription = await prisma.subscription.findMany({
      where: {
        userId: userId,
        expiresAt: {
          gte: new Date(), // Checks if the subscription has not expired
        },
      },
    });

    const hasSubscription = !!subscription; // True if the user has a valid subscription
    return NextResponse.json({ hasSubscription }, { status: 200 });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return NextResponse.json({ hasSubscription: false }, { status: 500 });
  }
}
