import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { Articles } from '@/app/front-page/types';
import { ArticleCardLatestNews, ArticleCardPopularNews, ArticleCardEditorChoice } from '@/app/front-page/ArticleCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CurrentDate from '@/app/current-date/page';

const prisma = new PrismaClient();

export default async function EntertainmentNews() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || '';
  // Fetch Latest News in Entertainment Category
  const latestNews: Articles[] = await prisma.article.findMany({
    where: { 
      category: {
        some: { 
          name: 'Entertainment' 
        } 
      }
    }, 
    orderBy: { createdAt: 'desc' },
  });

  // Fetch Editor's Choice in Entertainment Category
  const editorsChoice: Articles[] = await prisma.article.findMany({
    where: { 
      category: {
        some: { 
          name: 'Entertainment' 
        }
      },  
      editorsChoice: true 
    },  
  });
    
  // Fetch Most Popular in Entertainment Category
  const mostPopular: Articles[] = await prisma.article.findMany({
    where: { category: {some: { name: 'Entertainment' }} },
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
      <div>
        <CurrentDate />
      </div>
  
      <h1 className='mt-5 mx-2 font-bold text-3xl'> Entertainment</h1>
      <hr className="mt-5 border-gray-500" />
      <hr className="my-1 border-gray-500" />
             
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 p-5">            
        {/* Latest News Section */}
        <section className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-2 lg:col-span-2 ">
          <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">Latest News</h2>
          <div className="space-y-5 ">
            {latestNews.map((article) => (
              <ArticleCardLatestNews key={article.id} article={article} userId={userId} />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Most Popular News</h2>
          <div className="space-y-5 ">
            {mostPopular.map((article) => (
              <ArticleCardPopularNews key={article.id} article={article} userId={userId} />  
            ))}
          </div>
        </section>

        {/* Editor's Choice Section */}
        <section className="order-3 md:order-3 lg:order-3 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">Editor's Choice</h2>
          <div className="space-y-5 ">
            {editorsChoice.map((article) => (
              <ArticleCardEditorChoice key={article.id} article={article} userId={userId} />  
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
