import prisma from "@/lib/db";
import {
    AllLatestNews,
    ArticleCardEditorChoice,
    ArticleCardLatestNews,
    ArticleCardPopularNews,
    LiveNewsCard,
} from "./front-page/ArticleCard";
import { Articles } from "./front-page/types";
import Link from "next/link";
import CurrencyConverter from "./currency-conveter/page";
import { getWeather } from "./weather/actions";
import SmallWeatherCard from "./weather/smallweathercard";
import CurrentDate from "./current-date/page";

export default async function HomePage() {
    const WeatherToday = await getWeather("Linköping");

    // Fetch Latest Live News
    const latestLiveNews: Articles[] = await prisma.article.findMany({
        where: { category: { some: { name: "Live" } } },
        orderBy: { createdAt: "desc" },
        take: 1,
    });

    const liveNewsIds = latestLiveNews.map((article) => article.id);

    // Fetch Latest News
    const latestNews: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    // Fetch Editor's Choice
    const editorsChoice: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
            editorsChoice: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    // Fetch Most Popular
    const mostPopular: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { views: "desc" },
        take: 10,
    });

    // Fetch other category views
    const otherCategories = await prisma.category.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        include: {
            articles: {
                orderBy: { createdAt: "desc" },
                take: 1,
            },
        },
    });

    return (
        <main className="w-full pr-10 pl-10">
            <div>
                <CurrentDate />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 p-2">
                {/* Latest News Section */}
                <section className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-2 lg:col-span-2 ">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-red-500 hover:text-red-900">
                            <Link href={"/categories/live"}>Live News</Link>
                        </h2>
                        <div className="space-y-3">
                            {latestLiveNews.map((article) => (
                                <LiveNewsCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">
                            Latest News
                        </h2>
                        <div className="space-y-5 ">
                            {latestNews.map((article) => (
                                <ArticleCardLatestNews
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Most Popular Section */}
                <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-1 lg:col-span-1 ">
                    <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">
                        Most Popular News
                    </h2>
                    <div className="space-y-5 ">
                        {mostPopular.map((article) => (
                            <ArticleCardPopularNews
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                </section>

                {/* Editor's Choice Section */}
                <section className="order-3 md:order-3 lg:order-3 col-span-1 md:col-span-1 lg:col-span-1 ">
                    <div className=" hidden lg:block">
                        <Link href="/weather">
                            <SmallWeatherCard current={WeatherToday} />
                        </Link>
                        <CurrencyConverter />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">
                            Editor&apos;s Choice
                        </h2>
                        <div className="space-y-5 ">
                            {editorsChoice.map((article) => (
                                <ArticleCardEditorChoice
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <hr className="my-1 border-gray-800" />
            <hr className="my-1 border-gray-800" />

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
