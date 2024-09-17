"use server";

import prisma from "@/lib/db";

export async function getArticles() {
    const result = await prisma.article.findMany();

    return result;
}
