import { getArticleEditor } from "@/app/data/articles";
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
    const article = await getArticleEditor(params.articleId);

    if (!article) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Edit Article</h1>
            <ArticleForm
                article={article}
                categories={categories}
            ></ArticleForm>
        </div>
    );
}
