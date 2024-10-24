import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("api-key");

  if (apiKey !== process.env.RENEW_API_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const currentDate = new Date();
  const renewWindowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  try {
    const expiringSubscriptions = await prisma.subscription.findMany({
      where: {
        expiresAt: {
          gte: currentDate,
          lte: renewWindowDate,
        },
        autoRenew: true,
        status: "ACTIVE",
      },
      include: {
        subscriptionType: true,
      },
    });

    console.log("Expiring subscriptions found:", expiringSubscriptions);

    if (expiringSubscriptions.length === 0) {
      return NextResponse.json({
        message: "No subscriptions need renewal",
      });
    }

    const renewals = await Promise.all(
      expiringSubscriptions.map(async (subscription) => {
        try {
          console.log(
            `Your card was charged ${(
              subscription.subscriptionType.priceInCents / 100
            ).toFixed(2)}`
          );

          const updatedSubscription = await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              expiresAt: new Date(
                subscription.expiresAt.getTime() +
                  subscription.subscriptionType.durationInSeconds * 1000
              ),
              status: "ACTIVE",
              cancelledAt: null,
            },
          });

          return updatedSubscription;
        } catch (error) {
          console.error(
            `Failed to renew subscription ${subscription.id}:`,
            error
          );
          return null;
        }
      })
    );

    const successfulRenewals = renewals.filter((renewal) => renewal !== null);

    return NextResponse.json({
      message: "Subscriptions renewed",
      renewals: successfulRenewals,
      totalProcessed: expiringSubscriptions.length,
      successfulRenewals: successfulRenewals.length,
    });
  } catch (error) {
    console.error("Error in subscription renewal:", error);
    return NextResponse.json(
      { message: "Subscription renewal failed", error },
      { status: 500 }
    );
  }
}
