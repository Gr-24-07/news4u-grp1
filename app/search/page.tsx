import prisma from "@/lib/db";
import React from "react";
import ArticleSearch from "./search";
import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";

export default async function SearchPage({
    searchParams,
}: {
    searchParams?: {
        query?: Promise<string>;
        headline?: string;
        createdAt?: Date;
    };
}) {
    const query = await searchParams?.query;

    const articles = await prisma.article.findMany({
        where: {
            headline: {
                contains: query,
                mode: "insensitive",
            },
        },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
    });

    const options = { zone: "UTC" };

    return (
        <div>
            <div>
                <ArticleSearch />
            </div>

            <div className="px-4 gap-2">
                <div className="p-8">
                    <div>
                        {articles.map((article) => (
                            <div
                                className="grid grid-cols-2 border-b border-gray-300 mb-4"
                                key={article.id}
                            >
                                <div className=" ">
                                    <h2 className="text-xl font-bold hover:underline mb-3">
                                        <Link
                                            href={`/article-page/${article.id}`}
                                        >
                                            {article.headline}
                                        </Link>
                                    </h2>
                                    <p>
                                        <Link
                                            href={`/article-page/${article.id}`}
                                        >
                                            {article.summary}
                                        </Link>
                                    </p>
                                </div>

                                <Link href={`/article-page/${article.id}`}>
                                    <Image
                                        src={article.image}
                                        alt={article.headline}
                                        width={900}
                                        height={315}
                                        className="mx-auto justify-end w-4/5"
                                    />
                                </Link>
                                <small className="flex justify-between text-muted-foreground mb-4">
                                    {article.category.map((category) => (
                                        <Link
                                            href={`/categories/${category.name.toLocaleLowerCase()}`}
                                            key={category.name}
                                            className="hover:underline text-underline-offset"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                    <time className="text-muted-foreground">
                                        {DateTime.fromJSDate(
                                            article.createdAt,
                                            options
                                        ).toRelative({ locale: "en" })}
                                    </time>
                                </small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
