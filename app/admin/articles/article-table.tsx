"use client";

import { deleteArticle } from "@/app/actions/articles";
import { ArticleWithCategoryAuthor } from "@/app/data/articles";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Check, EllipsisVertical, X } from "lucide-react";
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
                    <TableHead>Editor&apos;s Choice</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead></TableHead>
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
                                    <div className="text-green-800">
                                        <Check />
                                    </div>
                                ) : (
                                    <div className="text-red-800">
                                        <X />
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                {article.editorsChoice ? (
                                    <div className="text-green-800">
                                        <Check />
                                    </div>
                                ) : (
                                    <div className="text-red-800">
                                        <X />
                                    </div>
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical></EllipsisVertical>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            Options
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                href={`/article-page/${article.id}`}
                                            >
                                                View
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href={`/admin/articles/edit/${article.id}`}
                                            >
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={async () => {
                                                const doDelete = confirm(
                                                    `Are you sure you want to delete article titled "${article.headline}"`
                                                );
                                                if (doDelete) {
                                                    deleteArticle(article.id);
                                                    toast({
                                                        title: "Article successfully deleted",
                                                        className:
                                                            "bg-secondary",
                                                    });
                                                }
                                            }}
                                            className="text-destructive focus:text-destructive focus:cursor-pointer"
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
