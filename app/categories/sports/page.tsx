import prisma from "@/lib/db";
import { Articles } from "@/app/front-page/types";
import {
  ArticleCardLatestNews,
  ArticleCardPopularNews,
  ArticleCardEditorChoice,
  AllLatestNews,
} from "@/app/front-page/ArticleCard";
import CurrentDate from "@/app/current-date/page";

export default async function SportNews() {
  // Fetch Latest News in Sport Category
  const latestNews: Articles[] = await prisma.article.findMany({
    where: {
      category: {
        some: {
          name: "Sport",
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Fetch Editor's Choice in Sport Category
  const editorsChoice: Articles[] = await prisma.article.findMany({
    where: {
      category: {
        some: {
          name: "Sport",
        },
      },
      editorsChoice: true,
    },
  });

  // Fetch Most Popular in Sport Category
  const mostPopular: Articles[] = await prisma.article.findMany({
    where: {
      category: {
        some: {
          name: "Sport",
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

      <h1 className="mx-2 font-bold text-3xl"> Sport</h1>
      <hr className="mt-5 border-gray-500" />
      <hr className="my-1 border-gray-500" />

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 p-5">
        {/* Latest News Section */}
        <section className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-2 lg:col-span-2 ">
          <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">
            Latest News
          </h2>
          <div className="space-y-5 ">
            {latestNews.map((article) => (
              <ArticleCardLatestNews key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-orange-500 hover:text-orange-700">
            Breaking Today
          </h2>
          <div className="space-y-5 ">
            {mostPopular.map((article) => (
              <ArticleCardPopularNews key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Editor's Choice Section */}
        <section className="order-3 md:order-3 lg:order-3 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-orange-500 hover:text-orange-700">
            Editor&apos;s Choice
          </h2>
          <div className="space-y-5 ">
            {editorsChoice.map((article) => (
              <ArticleCardEditorChoice key={article.id} article={article} />
            ))}
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
                {category.articles && category.articles.length > 0
                  ? category.articles.map((article) => (
                      <AllLatestNews key={article.id} article={article} />
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
