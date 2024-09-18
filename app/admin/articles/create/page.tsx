import { getCategories } from "@/app/data/categories";
import ArticleForm from "@/app/my-components/article-form";

export default async function CreateArticlePage() {
    const categories = await getCategories();

    return (
        <div className="container mx-auto max-w-screen-lg p-4">
            <h1 className="text-center text-3xl font-bold">Create Article</h1>
            <ArticleForm categories={categories}></ArticleForm>
        </div>
    );
}
