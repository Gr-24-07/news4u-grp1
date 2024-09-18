"use server";

import prisma from "@/lib/db";
import { z, ZodFormattedError } from "zod";

const CreateArticleSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    summary: z.string().min(1, "Summary is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().min(1, "Content is required").url("Invalid image url"),
    categories: z.string().transform((str) => {
        console.log(str);
        const arr = JSON.parse(str) as string[];
        console.log(arr);

        return arr; // Parse categories JSON array
    }),
    paid: z
        .string()
        .optional()
        .transform((val) => {
            if (val === "on") return true;
            return false;
        }),
});

export type CreateArticleFail = {
    success: false;
    errors: ZodFormattedError<
        {
            headline: string;
            summary: string;
            content: string;
            image: string;
            categories: string[];
        },
        string
    >;
};

export async function createArticle(
    formData: FormData
): Promise<CreateArticleFail | undefined> {
    const result = Object.fromEntries(formData.entries());
    console.log(result);

    const parsedResult = await CreateArticleSchema.safeParseAsync(result);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const data = parsedResult.data;

    //Temporary replace with real author
    const author = "cm16g8qds000011a22psj5pvs";

    await prisma.article.create({
        data: {
            headline: data.headline,
            content: data.content,
            summary: data.summary,
            image: data.image,
            paid: data.paid,
            author: {
                connect: {
                    id: author,
                },
            },
            category: {
                connect: data.categories.map((category: string) => ({
                    name: category,
                })),
            },
        },
    });
}
