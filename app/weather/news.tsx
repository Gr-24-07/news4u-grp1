import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ArticleCardLatestNews } from "../front-page/ArticleCard";
import prisma from "@/lib/db";

export default async function WeatherNews() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || ""; // Assuming this is the subscription ID

  const weatherArticles = await prisma.article.findMany({
    where: { category: { some: { name: "Weather" } } },
  });

  return (
    <div className="w-full mx-auto py-8 px-2">
      <div className="grid grid-cols-3 gap-8">
        {weatherArticles.map((article) => {
          return (
            <ArticleCardLatestNews
              key={article.id}
              article={article}
              userId={userId}
            />
          );
        })}
      </div>
    </div>
  );
}
