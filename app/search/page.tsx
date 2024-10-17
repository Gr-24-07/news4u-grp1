import prisma from "@/lib/db";
import React from "react";
import ArticleSearch from "./search";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    headline?: string;
    createdAt?: Date;
  };
}) {
  const query = searchParams?.query;

  const articles = await prisma.article.findMany({
    where: {
      headline: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mx-auto items-center text-center mt-8">
        Search Page
      </h1>
      <div>
        <ArticleSearch />
      </div>

      <div className="transition-colors px-4 gap-2">
        <Card className="border border-zinc-200 p-8">
          <CardContent>
            <div>
              {articles.map((article) => (
                <div className="flex flex-1" key={article.id}>
                  <div className="flex flex-col w-2/3">
                    <h2 className="text-xl font-bold hover:underline mb-3 ">
                      <Link href={`/article-page/${article.id}`}>
                        {article.headline}
                      </Link>
                    </h2>
                    <p>
                      <Link href={`/article-page/${article.id}`}>
                        {article.summary}
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-1 w-1/3">
                    <Link href={`/article-page/${article.id}`}>
                      <Image
                        src={article.image}
                        alt={article.headline}
                        width={300}
                        height={300}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
