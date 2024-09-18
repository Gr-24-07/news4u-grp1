import { PrismaClient } from '@prisma/client';
import ArticleCard from './ArticleCard';

const prisma = new PrismaClient();

export default async function FrontPage() {

  // Select LatestNews
  const latestNews = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }, 
    take: 10, 
  });

  // Select Editor's Choice
  const editorsChoice = await prisma.article.findMany({
    where: { paid: true }, 
    take: 5, 
  });

  // Select Most Popular
  const mostPopular = await prisma.article.findMany({
    orderBy: { views: 'desc' }, 
    take: 5, 
  });

  return (
    <main className="container mx-auto p-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-screen-lg w-full">

          {/* Latest News Section */}
          <section className="order-1 lg:order-2 col-span-1 lg:col-span-3  p-6 rounded-lg shadow-lg  mx-atuo ">
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className='space-y-3'>
              {latestNews.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Most Popular Section */}
          <section className="order-2 lg:order-1 lg:block col-span-1  p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">Most Popular News</h2>
            <div className='space-y-3'>
              {mostPopular.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* Editor's Choice Section */}
          <section className="order-3 lg:order-3 lg:block col-span-1  p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6">More</h2>
            <div className='space-y-3'>
              {editorsChoice.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}



