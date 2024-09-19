import { PrismaClient } from '@prisma/client';
import { ArticleCardEditorChoice, ArticleCardLatestNews, ArticleCardPopularNews } from './ArticleCard';


const prisma = new PrismaClient();

export default async function FrontPage() {

  // Select LatestNews
  const latestNews = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }, 
    
  });

  // Select Editor's Choice
  const editorsChoice = await prisma.article.findMany({
    where: { paid: true }, 
    take: 10, 
  });

  // Select Most Popular
  const mostPopular = await prisma.article.findMany({
    orderBy: { views: 'desc' }, 
    take: 10, 
  });

  return (
    <main className="w-full p-2 mt-11">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 max-w-screen-lg w-full">

          {/* Latest News Section */}
          <section className="order-1 lg:order-2 col-span-1 lg:col-span-4  p-2 rounded-lg mx-atuo ">
            <h2 className="text-sm font-bold mb-6 text-red-500  hover:text-red-900">Latest News</h2>
            <div className='space-y-3'>
              {latestNews.map((article) => (
                <ArticleCardLatestNews key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Most Popular Section */}
          <section className="order-2 lg:order-1 lg:block col-span-2  p-2 rounded-lg">
            <h2 className="text-sm font-bold mb-6  text-blue-500 hover:text-blue-900">Most Popular News</h2>
            <div className='space-y-3'>
              {mostPopular.map((article) => (
                <ArticleCardPopularNews key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Editor's Choice Section */}
          <section className="order-3 lg:order-3 lg:block col-span-2  p-2 rounded-lg">
            <h2 className="text-sm font-bold mb-6  text-blue-500  hover:text-blue-900">Editor's Choice Section</h2>
            <div className='space-y-3'>
              {editorsChoice.map((article) => (
                <ArticleCardEditorChoice key={article.id} article={article} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}



