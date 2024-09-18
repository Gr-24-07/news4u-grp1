import { getArticle } from "@/app/data/articles";
import { getCategories } from "@/app/data/categories";
import ArticleForm from "@/app/my-components/article-form";
import { notFound } from "next/navigation";

export default async function EditArticlePage({
    params,
}: {
    params: {
        articleId: string;
    };
}) {
    const categories = await getCategories();
    const article = await getArticle(params.articleId);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-screen-lg p-4">
            <h1 className="text-center text-3xl font-bold">Edit Article</h1>
            <ArticleForm
                article={article}
                categories={categories}
            ></ArticleForm>
        </div>
    );
}
