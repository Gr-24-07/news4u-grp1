import prisma from "@/lib/db";

export default async function HomePage() {
    const categories = await prisma.category.findMany();

    return (
        <div>
            <h1>News4U</h1>
            <pre>{JSON.stringify(categories, null, 2)}</pre>
        </div>
    );
}
