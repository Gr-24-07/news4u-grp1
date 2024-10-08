import { PrismaClient } from '@prisma/client';
import { ArticleCardEditorChoice, ArticleCardLatestNews, ArticleCardPopularNews } from './front-page/ArticleCard';
import CurrencyConverter from './currency-rate/page';

const prisma = new PrismaClient();

export default async function HomePage() {
    const latestLiveNews = await prisma.article.findMany({
        where: { category: { some: { name: 'Live' } } },
        orderBy: { createdAt: 'desc' },
    });

    const liveNewsIds = latestLiveNews.map(article => article.id);

    const latestNews = await prisma.article.findMany({  
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });

    const editorsChoice = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
            editorsChoice: true,
        },
        take: 10,
    });

    const mostPopular = await prisma.article.findMany({
        where: {
            id: { notIn: liveNewsIds },
        },
        orderBy: { views: 'desc' },
        take: 10,
    });

    const otherCategories = await prisma.category.findMany({
        include: {
            articles: {
                where: { id: { notIn: liveNewsIds } },
                orderBy: { createdAt: 'desc' },
                take: 1,
            },
        },
    });

    return (
        <main className="w-full p-5">
            <div className="flex flex-col md:flex-row justify-center">
                <div className="max-w-screen-lg w-full flex flex-col md:flex-row">

                    <div className="w-full md:w-3/4 p-4 space-y-6">
                        <section className="p-2 rounded-lg mx-auto">
                            <h2 className="text-3xl font-bold mb-6 text-red-500 hover:text-red-900">
                                Live News
                            </h2>
                            <div className="space-y-3">
                                {latestLiveNews.map((article) => (
                                    <ArticleCardLatestNews key={article.id} article={article} />
                                ))}
                            </div>
                        </section>

                        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                            <div className="w-full md:w-1/3 p-2">
                                <section className="p-2 rounded-lg">
                                    <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Most Popular News</h2>
                                    <div className="space-y-3">
                                        {mostPopular.map((article) => (
                                            <ArticleCardPopularNews key={article.id} article={article} />
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="w-full md:w-2/3 p-2">
                                <section className="p-2 rounded-lg">
                                    <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">Latest News</h2>
                                    <div className="space-y-3">
                                        {latestNews.map((article) => (
                                            <ArticleCardLatestNews key={article.id} article={article} />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 p-4">
                        <section className="p-2 rounded-lg">
                            <CurrencyConverter />
                            <h2 className="text-sm font-bold mb-2 text-blue-500 hover:text-blue-900 pt-5">Editor's Choice</h2>
                            <div className="space-y-3">
                                {editorsChoice.map((article) => (
                                    <ArticleCardEditorChoice key={article.id} article={article} />
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
                                      <ArticleCardLatestNews key={article.id} article={article} />
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
