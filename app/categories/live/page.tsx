import prisma from "@/lib/db";
import { Articles } from "@/app/front-page/types";
import {
    AllLatestNews,
    ArticleCardLatestNews,
} from "@/app/front-page/ArticleCard";
import CurrentDate from "@/app/current-date/page";

export default async function LiveNews() {
    // Fetch Latest News in Live Category
    const latestLiveNews: Articles[] = await prisma.article.findMany({
        where: {
            category: {
                some: {
                    name: "Live",
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const liveNewsIds = latestLiveNews.map((article) => article.id);

    // Fetch other category views (dynamic sections)
    const otherCategories = await prisma.category.findMany({
        include: {
            articles: {
                where: { id: { notIn: liveNewsIds } },
                orderBy: { createdAt: "desc" },
                take: 1,
            },
        },
    });

    return (
        <main className="w-full px-5">
            <div>
                <CurrentDate />
            </div>

            <h1 className="mx-2 font-bold text-3xl text-red-600"> Live</h1>
            <hr className="mt-5 border-gray-500" />
            <hr className="my-1 border-gray-500" />

            {/* Left Column - Latest Live News */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 p-5">
                <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-3 lg:col-span-3 ">
                    <div className="space-y-3">
                        {latestLiveNews.map((article) => (
                            <ArticleCardLatestNews
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <hr className="my-1 border-gray-500" />
            <hr className="my-1 border-gray-500" />

            {/* all category Section */}
            <section className="mt-5">
                <h2 className="text-md font-bold mb-2 text-black">More</h2>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-3">
                    {otherCategories.map((category) => (
                        <div key={category.id} className="pr-5 pl-5">
                            <h3 className="text-md font-bold text-gray-800 mb-2">
                                {category.name}
                            </h3>
                            <div className="space-y-2">
                                {category.articles &&
                                category.articles.length > 0
                                    ? category.articles.map((article) => (
                                          <AllLatestNews
                                              key={article.id}
                                              article={article}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
