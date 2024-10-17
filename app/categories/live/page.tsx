import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Articles } from '@/app/front-page/types';
import { ArticleCardLatestNews } from '@/app/front-page/ArticleCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CurrentDate from '@/app/current-date/page';

const prisma = new PrismaClient();

export default async function LiveNews() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || '';  

  // Fetch Latest News in Live Category
  const latestLiveNews: Articles[] = await prisma.article.findMany({
    where: { 
      category: {
        some: { 
          name: 'Live' 
        } 
      }
    }, 
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
    <main className="w-full p-10">
      <div>
        <CurrentDate />
      </div>
      
      <h1 className='mt-5 mx-2 font-bold text-3xl text-red-600'> Live</h1>
      <hr className="mt-5 border-gray-500" />
      <hr className="my-1 border-gray-500" />

      {/* Left Column - Latest Live News */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 p-5">            
        <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-3 lg:col-span-3 ">
          <div className="space-y-3">
            {latestLiveNews.map((article) => (
              <ArticleCardLatestNews key={article.id} article={article} userId={userId} />
            ))}
          </div>
        </section>
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
