import { PrismaClient } from "@prisma/client";
import {
  ArticleCardEditorChoice,
  ArticleCardLatestNews,
  ArticleCardPopularNews,
} from "./front-page/ArticleCard";
import { Articles } from "./front-page/types";
import Link from "next/link";
import CurrencyConverter from "./currency-conveter/page";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getWeather } from "./weather/actions";
import SmallWeatherCard from "./weather/smallweathercard";
import CurrentDate from "./current-date/page";
import AccountDeletedHandler from "./profile/ProfileAccountDeleteHandler";

const prisma = new PrismaClient();

export default async function HomePage() {
  const WeatherToday = await getWeather("Linköping");

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  // Fetch Latest News in Live Category
  const latestLiveNews: Articles[] = await prisma.article.findMany({
    where: { category: { some: { name: "Live" } } },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  const liveNewsIds = latestLiveNews.map((article) => article.id);

  // Fetch Latest News
  const latestNews: Articles[] = await prisma.article.findMany({
    where: {
      id: { notIn: liveNewsIds },
    },
    orderBy: { createdAt: "desc" },
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
    orderBy: { views: "desc" },
    take: 10,
  });

  // Fetch other category views
  const otherCategories = await prisma.category.findMany({
    where: {
      id: { notIn: liveNewsIds },
    },
    include: {
      articles: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <main className="w-full p-10">
      <div>
        <CurrentDate />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 p-5">
        <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-3 lg:col-span-3 ">
          <h2 className="text-3xl font-bold mb-6 text-red-500 hover:text-red-900">
            <Link href={"/categories/live"}>Live News</Link>
          </h2>
          <div className="space-y-3">
            {latestLiveNews.map((article) => (
              <ArticleCardLatestNews
                key={article.id}
                article={article}
                userId={userId}
              />
            ))}
          </div>
        </section>

        <div className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-1 lg:col-span-1 p-2  mt-10">
          <SmallWeatherCard current={WeatherToday} />
          <CurrencyConverter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 p-5">
        {/* Latest News Section */}
        <section className="order-1 md:order-2 lg:order-2 col-span-1 md:col-span-2 lg:col-span-2 ">
          <h2 className="text-sm font-bold mb-6 text-red-500 hover:text-red-900">
            Latest News
          </h2>
          <div className="space-y-5 ">
            {latestNews.map((article) => (
              <ArticleCardLatestNews
                key={article.id}
                article={article}
                userId={userId}
              />
            ))}
          </div>
        </section>

        {/* Most Popular Section */}
        <section className="order-2 md:order-1 lg:order-1 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">
            Most Popular News
          </h2>
          <div className="space-y-5 ">
            {mostPopular.map((article) => (
              <ArticleCardPopularNews
                key={article.id}
                article={article}
                userId={userId}
              />
            ))}
          </div>
        </section>

        {/* Editor's Choice Section */}
        <section className="order-3 md:order-3 lg:order-3 col-span-1 md:col-span-1 lg:col-span-1 ">
          <h2 className="text-sm font-bold mb-6 text-blue-500 hover:text-blue-900">
            Editor's Choice
          </h2>
          <div className="space-y-5 ">
            {editorsChoice.map((article) => (
              <ArticleCardEditorChoice
                key={article.id}
                article={article}
                userId={userId}
              />
            ))}
          </div>
        </section>
      </div>

      <hr className="my-1 border-gray-500" />
      <hr className="my-1 border-gray-500" />

      <section className="mt-12">
        <h2 className="text-lg font-bold mb-6 text-gray-700">More</h2>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-6">
          {otherCategories.map((category) => (
            <div key={category.id} className="p-4">
              <h3 className="text-md font-bold text-gray-800 mb-2">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.articles && category.articles.length > 0
                  ? category.articles.map((article) => (
                      <ArticleCardLatestNews
                        key={article.id}
                        article={article}
                        userId={userId}
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
