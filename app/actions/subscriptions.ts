"use server";

import prisma from "@/lib/db";
import { z } from "zod";

const CreateSubSchema = z.object({
    userId: z.string().min(1),
    subId: z.string().min(1),
    cardnumber: z.string().min(1, "Required"),
    cvc: z.string().min(1, "Required"),
    date: z.string().min(1, "Required"),
});

export type CreateSubFail = {
    success: false;
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

export async function createSubscription(
    formData: FormData
): Promise<CreateSubFail | undefined> {
    const result = Object.fromEntries(formData.entries());

    const parsedResult = await CreateSubSchema.safeParseAsync(result);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const subType = await prisma.subscriptionType.findUnique({
        where: {
            id: parsedResult.data.subId,
        },
    });

    // await prisma.subscription.create({
    //     data: {
    //         expiresAt: "2024-12-12",
    //     },
    // });
}
