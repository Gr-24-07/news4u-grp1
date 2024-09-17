"use server";

import prisma from "@/lib/db";
import { z, ZodFormattedError } from "zod";

const CreateArticleSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    summary: z.string().min(1, "Summary is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().min(1, "Content is required").url("Invalid image url"),
});

export async function getArticles() {
    const result = await prisma.article.findMany();

    return result;
}

export type CreateArticleFail = {
    success: false;
    errors: ZodFormattedError<
        {
            headline: string;
            summary: string;
            content: string;
            image: string;
        },
        string
    >;
};

export async function createArticle(
    formData: FormData
): Promise<CreateArticleFail | undefined> {
    const result = Object.fromEntries(formData.entries());
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
            author: {
                connect: {
                    id: author,
                },
            },
        },
    });
}
