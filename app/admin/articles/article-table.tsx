"use client";

import { deleteArticle } from "@/app/actions/articles";
import { ArticleWithCategoryAuthor } from "@/app/data/articles";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Check, Pencil, Trash, X } from "lucide-react";
import Link from "next/link";

export default function ArticleTable({
    articles,
}: {
    articles: ArticleWithCategoryAuthor[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Headline</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => {
                    return (
                        <TableRow key={article.id}>
                            <TableCell className="w-40">
                                <div className="line-clamp-2">
                                    {article.headline}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="line-clamp-2">
                                    {article.summary}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                {article.views}
                            </TableCell>
                            <TableCell>
                                {article.paid ? (
                                    <button className="text-green-800">
                                        <Check />
                                    </button>
                                ) : (
                                    <button className="text-red-800">
                                        <X />
                                    </button>
                                )}
                            </TableCell>
                            <TableCell>{`${article.author.firstName} ${article.author.lastName}`}</TableCell>
                            <TableCell>
                                {article.createdAt.toLocaleDateString("sv")}
                            </TableCell>
                            <TableCell>
                                {article.updatedAt.toLocaleDateString("sv")}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="block text-blue-800 animate-pulse border p-1 border-blue-800 hover:bg-blue-200"
                                >
                                    <Pencil />
                                </Link>
                            </TableCell>
                            <TableCell>
                                <button
                                    onClick={async () => {
                                        const doDelete = confirm(
                                            `Are you sure you want to delete article titled "${article.headline}"`
                                        );
                                        if (doDelete) {
                                            deleteArticle(article.id);
                                            toast({
                                                title: "Article successfully deleted",
                                                className: "bg-secondary",
                                            });
                                        }
                                    }}
                                    className="text-destructive animate-pulse border p-1 border-destructive hover:bg-red-200"
                                >
                                    <Trash></Trash>
                                </button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
