"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const CreateSubSchema = z.object({
    userId: z.string().min(1),
    subId: z.string().min(1),
    cardnumber: z.string().length(16, "Invalid card number"),
    cvc: z.string().length(3, "Required, 3 digits"),
    date: z.string().min(1, "Required, MM/YY"),
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

    const existingSub = await prisma.subscription.findUnique({
        where: {
            userId: parsedResult.data.userId,
        },
    });

    if (existingSub) {
        return {
            error: "database",
            errorMessage: "User is already subscribed",
        };
    }

    const expireDate = new Date(
        new Date().getTime() + subType?.durationInSeconds * 1000
    );

    await prisma.subscription.create({
        data: {
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
