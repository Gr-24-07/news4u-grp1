import { PrismaClient } from '@prisma/client';
import { Articles } from '@/app/front-page/types'; 
import { ArticleCardEditorChoice, ArticleCardLatestNews, ArticleCardPopularNews } from '@/app/front-page/ArticleCard';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function BusinessNewsPage() {
    // Fetch Latest News in Business News Category
    const latestNews: Articles[] = await prisma.article.findMany({
        where: { category: {some: { name: 'Business' } }}, 
        orderBy: { createdAt: 'desc' },
       
    });

    // Fetch Editor's Choice in Business Category
    const editorsChoice: Articles[] = await prisma.article.findMany({
        where: { category: {some: { name: 'Business' }}, paid: true },  
     
    });
    
    // Fetch Most Popular in Business Category
    const mostPopular: Articles[] = await prisma.article.findMany({
        where: { category: {some: { name: 'Business' }} },
        orderBy: { views: 'desc' },
       
    });

    // Fetch other category views (dynamic sections)
    const otherCategories = await prisma.category.findMany({
        include: {
          articles: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });

    return (
      <main className="w-full p-5">
        <h1 className='mt-5 font-bold text-3xl'> Business</h1>
             <hr className="mt-5 border-gray-500" />
             <hr className="my-1 border-gray-500" />
             
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 max-w-screen-lg w-full">
            {/* Latest News Section */}
            <section className="order-1 lg:order-2 col-span-1 lg:col-span-4 p-2 rounded-lg mx-auto">
              <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">Latest News</h2>
              <div className="space-y-3">
                {latestNews.map((article) => (
                  <Link href={`/article-page/${article.id}`}>
                    <ArticleCardLatestNews key={article.id} article={article} />
                  </Link>
                ))}
              </div>
            </section>

            {/* Most Popular Section */}
            <section className="order-2 lg:order-1 col-span-2 p-2 rounded-lg">
              <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Most Popular News</h2>
              <div className="space-y-3">
                {mostPopular.map((article) => (
                  <Link href={`/article-page/${article.id}`}>
                    <ArticleCardPopularNews key={article.id} article={article} />
                  </Link>
                ))}
              </div>
            </section>

            {/* Editor's Choice Section */}
            <section className="order-3 lg:order-3 col-span-2 p-2 rounded-lg">
              <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Editor's Choice</h2>
              <div className="space-y-3">
                {editorsChoice.map((article) => (
                  <Link href={`/article-page/${article.id}`}>
                    <ArticleCardEditorChoice key={article.id} article={article} />
                  </Link>
                ))}
              </div>
            </section>
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
                                        <Link href={`/article-page/${article.id}`}>
                                            <h4 className="text-sm font-semibold text-gray-900 hover:underline">{article.headline}</h4>
                                            <div className="relative">
                                                <img
                                                    src={article.image}
                                                    alt={article.headline}
                                                    className="w-auto object-cover mt-2"
                                                />
                                            </div>
                                          <p className="text-xs text-gray-600 pt-3">{article.summary}</p>
                                          </Link>
                                      </div>
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
