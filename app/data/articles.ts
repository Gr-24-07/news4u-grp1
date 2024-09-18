import prisma from "@/lib/db";
import { Article, Category } from "@prisma/client";

export type ArticleWithCategoryAuthor = Article & {
    category: Category[];
} & {
    author: {
        firstName: string | null;
        lastName: string | null;
    };
};

export async function getArticles(): Promise<ArticleWithCategoryAuthor[]> {
    const result = await prisma.article.findMany({
        include: {
            category: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    return result;
}

export async function getArticle(
    id: string
): Promise<ArticleWithCategoryAuthor | null> {
    const result = await prisma.article.findUnique({
        where: {
            id: id,
        },
        include: {
            category: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    return result;
}
