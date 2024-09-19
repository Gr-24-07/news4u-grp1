import prisma from "@/lib/db";

export async function getCategories() {
    const result = await prisma.category.findMany();

    return result;
}
