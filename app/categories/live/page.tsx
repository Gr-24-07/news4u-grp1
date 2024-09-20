import { PrismaClient } from '@prisma/client';
import { Articles } from '@/app/front-page/types'; 

const prisma = new PrismaClient();

export default async function LiveNews() {
    // Fetch Latest News in Live Category
    const latestLiveNews: Articles[] = await prisma.article.findMany({
        where: { category: {some: { name: 'Live' } }}, 
        orderBy: { createdAt: 'desc' },
    });
    
    const liveNewsIds = latestLiveNews.map(article => article.id);

    // Fetch other category views (dynamic sections)
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
        <main className="container mx-auto">
            <h1 className='mt-5 font-bold text-3xl text-red-600'> Live</h1>
        <hr className="mt-5 border-gray-500" />
        <hr className="my-1 border-gray-500" />

        <div className="flex justify-center">
            <div className="max-w-screen-lg w-full flex">

                {/* Left Column - Latest Live News */}
                <div className="w-3/4 p-4">
                <section className="p-2 rounded-lg mx-auto">
        
                    <div className="space-y-3">
                    {latestLiveNews.map((article) => (
                        <div key={article.id}>
                        <div>
                            <h3 className="font-bold text-xl text-black hover:underline">{article.headline}</h3>
                            <img
                            src={article.image}
                            alt={article.headline}
                            className="w-full object-cover mt-2"
                            />
                            <p className="text-sm text-gray-800 whitespace-normal break-words">
                            {article.summary}
                            </p>
                            <hr className="my-4 border-gray-300" />
                        </div>
                        </div>
                    ))}
                    </div>
                </section>
                </div>

                {/* Right Column - Blank */}
                <div className="w-1/4 p-4">
                {/* This section is intentionally left blank */}
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
                                      <div key={article.id} className="pb-2 mb-2">
                                          <h4 className="text-sm font-semibold text-gray-900 hover:underline">{article.headline}</h4>
                                          <div className="relative">
                                              <img
                                                  src={article.image}
                                                  alt={article.headline}
                                                  className="w-auto object-cover mt-2"
                                              />
                                          </div>
                                          <p className="text-xs text-gray-600">{article.summary}</p>
                                      </div>
                                  ))
                              ) : (
                                  <p>No articles available</p>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
            </section>
      </main>
    );
}
