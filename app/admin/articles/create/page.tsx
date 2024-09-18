import { getArticles } from "@/app/data/articles";
import { getCategories } from "@/app/data/categories";
import ArticleForm from "@/app/my-components/article-form";

export default async function CreateArticlePage() {
    const categories = await getCategories();
    const articles = await getArticles();

    return (
        <div className="container mx-auto max-w-screen-lg p-4">
            <h1 className="text-center text-3xl font-bold">Create Article</h1>
            <ArticleForm
                article={articles[2]}
                categories={categories}
            ></ArticleForm>
        </div>
    );
}
