import { PrismaClient } from '@prisma/client';
import { ArticleCardEditorChoice, ArticleCardLatestNews, ArticleCardPopularNews } from './front-page/ArticleCard';
import { Articles } from './front-page/types';
import Link from 'next/link';
import CurrencyConverter from './currency-conveter/page';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || ''; // Assuming this is the subscription ID

    // Fetch Latest News in Live Category
    const latestLiveNews: Articles[] = await prisma.article.findMany({
        where: { category: { some: { name: 'Live' } } },
        orderBy: { createdAt: 'desc' },
    });

    const liveNewsIds = latestLiveNews.map(article => article.id);

    // Fetch Latest News
    const latestNews: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });

    // Fetch Editor's Choice
    const editorsChoice: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
            editorsChoice: true,
        },
        take: 10,
    });

    // Fetch Most Popular
    const mostPopular: Articles[] = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { views: 'desc' },
        take: 10,
    });

    // Fetch other category views
    const otherCategories = await prisma.category.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        include: {
            articles: {
                orderBy: { createdAt: 'desc' },
                take: 1,
            },
        },
    });

    return (
        <main className="w-full p-5">
            <div className="flex flex-col md:flex-row justify-center">
                <div className="max-w-screen-lg w-full flex flex-col md:flex-row">

                    {/* Left Column (Main Content) */}
                    <div className="w-full md:w-3/4 p-4 space-y-6">

                        {/* First Row: Live News */}
                        <section className="p-2 rounded-lg mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-red-500 hover:text-red-900">
                                <Link href={"/categories/live"}>Live</Link>
                            </h2>
                            <div className="space-y-3">
                                {latestLiveNews.map((article) => (
                                    <ArticleCardLatestNews key={article.id} article={article} userId={userId} />

                                ))}
                            </div>
                        </section>

                        {/* Second Row: Two Columns (Most Popular News & Latest News) */}
                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                            {/* Left Column: Most Popular News */}
                            <div className="w-full md:w-1/3 p-2">
                                <section className="p-2 rounded-lg">
                                    <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Most Popular News</h2>
                                    <div className="space-y-3">
                                        {mostPopular.map((article) => (
                                            <ArticleCardPopularNews key={article.id} article={article} userId={userId} />
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Latest News */}
                            <div className="w-full md:w-2/3 p-2">
                                <section className="p-2 rounded-lg">
                                    <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">Latest News</h2>
                                    <div className="space-y-3">
                                        {latestNews.map((article) => (
                                            <ArticleCardLatestNews key={article.id} article={article} userId={userId} />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Editor's Choice News */}
                    <div className="w-full md:w-1/4 p-4">
                        <section className="p-2 rounded-lg">
                            <CurrencyConverter />
                            <h2 className="text-sm font-bold mb-2 text-blue-500 hover:text-blue-900 pt-5">Editor's Choice</h2>
                            <div className="space-y-3">
                                {editorsChoice.map((article) => (
                                    <ArticleCardEditorChoice key={article.id} article={article} userId={userId} />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <hr className="my-1 border-gray-500" />
            <hr className="my-1 border-gray-500" />

            <section className="mt-12 p-5">
                <h2 className="text-lg font-bold mb-6 text-gray-700">More</h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {otherCategories.map((category) => (
                        <div key={category.id} className="p-4">
                            <h3 className="text-md font-bold text-gray-800 mb-2">{category.name}</h3>
                            <div className="space-y-2">
                                {category.articles && category.articles.length > 0 ? (
                                    category.articles.map((article) => (
                                        <ArticleCardLatestNews key={article.id} article={article} userId={userId} />
                                    ))
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}