import { getArticles } from "@/app/data/articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArticleTable from "./article-table";

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="container mx-auto max-w-screen-lg flex flex-col gap-6">
            <h1 className="text-center text-3xl font-bold">Articles</h1>
            <Button asChild className="w-36 self-end">
                <Link href="/admin/articles/create">Create New Article</Link>
            </Button>
            <ArticleTable articles={articles}></ArticleTable>
        </div>
    );
}
