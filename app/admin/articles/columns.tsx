"use client";

import { deleteArticle } from "@/app/actions/articles";
import { ArticleWithCategoryAuthor } from "@/app/data/articles";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, EllipsisVertical, X } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ArticleWithCategoryAuthor>[] = [
    {
        accessorKey: "headline",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Headline
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.headline}</div>;
        },
    },
    {
        accessorKey: "summary",
        header: "Summary",
        cell: ({ row }) => {
            return <div className="line-clamp-2">{row.original.summary}</div>;
        },
    },
    {
        accessorKey: "views",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Views
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="text-right">{row.original.views}</div>;
        },
    },
    {
        accessorKey: "paid",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Paid
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            return (
                <div className="flex justify-center flex-row">
                    {article.paid ? (
                        <div className="text-green-800">
                            <Check />
                        </div>
                    ) : (
                        <div className="text-red-800">
                            <X />
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "editorsChoice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Editor&apos;s Choice
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            return (
                <div className="justify-center flex flex-row">
                    {article.editorsChoice ? (
                        <div className="text-green-800">
                            <Check />
                        </div>
                    ) : (
                        <div className="text-red-800">
                            <X />
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Author
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            return (
                <div>{`${article.author.firstName} ${article.author.lastName}`}</div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            return <div>{article.createdAt.toLocaleDateString("sv")}</div>;
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Updated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const article = row.original;
            return <div>{article.updatedAt.toLocaleDateString("sv")}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const article = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical></EllipsisVertical>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/article-page/${article.id}`}>
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/admin/articles/edit/${article.id}`}>
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
                                        className: "bg-secondary",
                                    });
                                }
                            }}
                            className="text-destructive focus:text-destructive focus:cursor-pointer"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
