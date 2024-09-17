import { getArticles } from "@/app/actions/articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="container mx-auto max-w-screen-lg">
            <h1 className="text-center text-3xl font-bold">Articles</h1>
            <Button asChild>
                <Link href="/admin/articles/create">Create New</Link>
            </Button>
            <pre>{JSON.stringify(articles, null, 2)}</pre>
        </div>
    );
}
