import prisma from "@/lib/db";
import { Articles } from "@/app/front-page/types";
import {
    ArticleCardLatestNews,
    ArticleCardPopularNews,
    ArticleCardEditorChoice,
    AllLatestNews,
} from "@/app/front-page/ArticleCard";
import CurrentDate from "@/app/current-date/page";
import CurrencyConverter from "@/app/currency-conveter/page";
import Link from "next/link";
import { Banknote } from "lucide-react";

export default async function EconomyNews() {
    // Fetch Latest News in Economy Category
    const latestNews: Articles[] = await prisma.article.findMany({
        where: {
            category: {
                some: {
                    name: "Economy",
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Fetch Editor's Choice in Economy Category
    const editorsChoice: Articles[] = await prisma.article.findMany({
        where: {
            category: {
                some: {
                    name: "Economy",
                },
            },
            editorsChoice: true,
        },
    });

    // Fetch Most Popular in Economy Category
    const mostPopular: Articles[] = await prisma.article.findMany({
        where: {
            category: {
                some: {
                    name: "Economy",
                },
            },
        },
        orderBy: { views: "desc" },
    });

    // Fetch other category views (dynamic sections)
    const otherCategories = await prisma.category.findMany({
        include: {
            articles: {
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

            <h1 className="mx-2 font-bold text-3xl"> Economy</h1>
            <hr className="mt-3 border-gray-500" />
            <hr className="my-1 border-gray-500" />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 p-5">
                {/* Latest News Section */}
                <section className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-2 lg:col-span-2 ">
                    <div className="sm:hidden flex justify-end w-full">
                        <Link
                            className="flex gap-0.5 items-center text-xs text-white bg-black px-3 py-2 rounded-md ml-auto"
                            href="/currency-conveter" // Ensure the path is correct
                        >
                            <Banknote />
                            Currency Converter
                        </Link>
                    </div>

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
                </section>

                {/* Most Popular Section */}
                <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-1 lg:col-span-1 ">
                    <h2 className="text-sm font-bold mb-6 text-orange-500 hover:text-orange-700">
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
                        <CurrencyConverter />
                    </div>

                    <div>
                        <Link
                            className="justify-center gap-0.5 items-center text-xs text-white bg-black px-3 py-2 rounded-md hidden md:flex lg:hidden"
                            href="/currency-conveter" // Ensure the path is correct
                        >
                            <Banknote />
                            Currency Converter
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold mb-6 text-orange-500 hover:text-orange-700">
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
