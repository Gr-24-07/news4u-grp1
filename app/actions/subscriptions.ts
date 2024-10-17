"use server";

import prisma from "@/lib/db";
import { sendSubConfirmation } from "@/utils/email";
import { z } from "zod";

const CreateSubSchema = z.object({
  userId: z.string().min(1),
  subId: z.string().min(1),
  cardnumber: z.string().length(16, "Invalid card number"),
  cvc: z.string().length(3, "Required, 3 digits"),
  date: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid date, use MM/YY"),
});

export type CreateSubFailValidate = {
  error: "validation";
  errors: z.ZodFormattedError<
    {
      userId: string;
      subId: string;
      cardnumber: string;
      cvc: string;
      date: string;
    },
    string
  >;
};

export type CreateSubFailDb = {
  error: "database";
  errorMessage: string;
};

export async function createSubscription(
  formData: FormData
): Promise<CreateSubFailValidate | CreateSubFailDb | undefined> {
  const result = Object.fromEntries(formData.entries());

  const parsedResult = await CreateSubSchema.safeParseAsync(result);

  if (!parsedResult.success) {
    const formattedErrors = parsedResult.error.format();

    return {
      error: "validation",
      errors: formattedErrors,
    };
  }

  console.log(parsedResult.data);

  const subType = await prisma.subscriptionType.findUnique({
    where: {
      id: parsedResult.data.subId,
    },
  });

  if (!subType) {
    return {
      error: "database",
      errorMessage: "Subscription Type not found",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: parsedResult.data.userId },
    include: { subscription: true },
  });

  if (!user) {
    return {
      error: "database",
      errorMessage: "User not found",
    };
  }

  const now = new Date();
  const expireDate = new Date(now.getTime() + subType.durationInSeconds * 1000);

  let sub;

  if (user.subscription) {
    // User has an existing subscription, update it
    sub = await prisma.subscription.update({
      where: { id: user.subscription.id },
      data: {
        status: "ACTIVE",
        expiresAt: expireDate,
        priceInCents: subType.priceInCents,
        subscriptionType: {
          connect: {
            id: subType.id,
          },
        },
        cancelledAt: null,
      },
    });
  } else {
    // User doesn't have a subscription, create a new one
    sub = await prisma.subscription.create({
      data: {
        status: "ACTIVE",
        expiresAt: expireDate,
        priceInCents: subType.priceInCents,
        user: {
          connect: {
            id: parsedResult.data.userId,
          },
        },
        subscriptionType: {
          connect: {
            id: subType.id,
          },
        },
      },
    });
  }

  sendSubConfirmation("test@test.se", sub);
}

export async function cancelSubscription(userId: string) {
  try {
    const now = new Date();
    const updatedSubscription = await prisma.subscription.update({
      where: {
        userId: userId,
        status: "ACTIVE",
      },
      data: {
        status: "CANCELLED",
        cancelledAt: now,
        autoRenew: false,
      },
    });

    if (!updatedSubscription) {
      throw new Error("Active subscription not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return { success: false, error: "Failed to cancel subscription" };
  }
}
