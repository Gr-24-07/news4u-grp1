"use server";

import prisma from "@/lib/db";
import { z, ZodFormattedError } from "zod";
import { getCategories } from "../data/categories";
import { revalidatePath } from "next/cache";
import xss from "xss";

const CreateArticleSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    summary: z.string().min(1, "Summary is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().min(1, "Content is required").url("Invalid image url"),
    categories: z.string().transform((str) => {
        const arr = JSON.parse(str) as string[];

        return arr; // Parse categories JSON array
    }),
    paid: z
        .string()
        .optional()
        .transform((val) => {
            if (val === "on") return true;
            return false;
        }),
    editorsChoice: z
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
            categories: string;
            paid?: string | undefined;
            editorsChoice?: string | undefined;
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

    data.content = xss(data.content);

    //TODO replace with real author
    const author = "cm16g8qds000011a22psj5pvs";

    await prisma.article.create({
        data: {
            headline: data.headline,
            content: data.content,
            summary: data.summary,
            image: data.image,
            paid: data.paid,
            editorsChoice: data.editorsChoice,
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

    revalidatePath("/admin/articles");
}

const UpdateArticleSchema = z.object({
    id: z.string().min(1),
    headline: z.string().min(1, "Headline is required"),
    summary: z.string().min(1, "Summary is required"),
    content: z.string().min(1, "Content is required"),
    image: z.string().min(1, "Content is required").url("Invalid image url"),
    categories: z.string().transform((str) => {
        const arr = JSON.parse(str) as string[];

        return arr; // Parse categories JSON array
    }),
    paid: z
        .string()
        .optional()
        .transform((val) => {
            if (val === "on") return true;
            return false;
        }),
    editorsChoice: z
        .string()
        .optional()
        .transform((val) => {
            if (val === "on") return true;
            return false;
        }),
});

export type UpdateArticleFail = {
    success: false;
    errors: ZodFormattedError<
        {
            id: string;
            headline: string;
            summary: string;
            content: string;
            image: string;
            categories: string;
            paid?: string | undefined;
            editorsChoice?: string | undefined;
        },
        string
    >;
};

export async function updateArticle(
    formData: FormData
): Promise<UpdateArticleFail | undefined> {
    const result = Object.fromEntries(formData.entries());

    const parsedResult = await UpdateArticleSchema.safeParseAsync(result);

    if (!parsedResult.success) {
        const formattedErrors = parsedResult.error.format();

        return {
            success: false,
            errors: formattedErrors,
        };
    }

    const categories = await getCategories();

    const data = parsedResult.data;

    data.content = xss(data.content);

    //TODO replace with real author
    const author = "cm16g8qds000011a22psj5pvs";

    await prisma.article.update({
        where: {
            id: data.id,
        },
        data: {
            headline: data.headline,
            content: data.content,
            summary: data.summary,
            image: data.image,
            paid: data.paid,
            editorsChoice: data.editorsChoice,
            author: {
                connect: {
                    id: author,
                },
            },
            category: {
                disconnect: categories,
                connect: data.categories.map((category) => ({
                    name: category,
                })),
            },
        },
    });

    revalidatePath("/admin/articles");
}

export async function deleteArticle(id: string) {
    await prisma.article.delete({
        where: {
            id: id,
        },
    });

    revalidatePath("/admin/articles");
}
