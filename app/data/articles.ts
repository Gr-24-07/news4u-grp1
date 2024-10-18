import prisma from "@/lib/db";
import { Article, Category } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export type ArticleWithCategoryAuthor = Article & {
    category: Category[];
} & {
    author: {
        firstName: string | null;
        lastName: string | null;
    };
};

export async function getArticles(): Promise<ArticleWithCategoryAuthor[]> {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN" && session?.user.role !== "EDITOR") {
        throw new Error("Not authenticated");
    }

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
    const article = await prisma.article.findUnique({
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

    return article;
}

type GetArticleSuccess = {
    success: true;
    data: ArticleWithCategoryAuthor;
};

type GetArticleFail = {
    success: false;
    error: string;
};

type GetArticleResponse = GetArticleFail | GetArticleSuccess;

export async function getArticleUser(id: string): Promise<GetArticleResponse> {
    const article = await prisma.article.findUnique({
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

    if (!article) {
        return {
            success: false,
            error: "Article not found",
        };
    }

    if (!article.paid) {
        await prisma.article.update({
            where: {
                id: article.id,
            },
            data: {
                views: { increment: 1 },
            },
        });

        return {
            success: true,
            data: article,
        };
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return {
            success: false,
            error: "User is not authenticated",
        };
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            subscription: true,
        },
    });

    if (!user?.subscription || user?.subscription?.expiresAt < new Date()) {
        console.log("no valid sub");

        return {
            success: false,
            error: "No valid subscription",
        };
    }

    await prisma.article.update({
        where: {
            id: article.id,
        },
        data: {
            views: { increment: 1 },
        },
    });

    return {
        success: true,
        data: article,
    };
}

export async function getArticlePreview(id: string) {
    const article = await prisma.article.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            summary: true,
            image: true,
            headline: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            createdAt: true,
            category: true,
            paid: true,
            editorsChoice: true,
        },
    });

    return article;
}

export async function getArticlesPreview(category?: string) {
    const article = await prisma.article.findMany({
        where: {
            category: {
                some: {
                    name: category,
                },
            },
        },
        select: {
            id: true,
            summary: true,
            image: true,
            headline: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            createdAt: true,
            category: true,
            paid: true,
            editorsChoice: true,
        },
    });

    return article;
}

export async function getArticleEditor(id: string) {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN" && session?.user.role !== "EDITOR") {
        throw new Error("Not authenticated");
    }

    const article = await prisma.article.findUnique({
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

    return article;
}
