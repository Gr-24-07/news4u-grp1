import { ArticleWithCategoryAuthor } from "@/app/data/articles";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check, Pencil, X } from "lucide-react";
import Link from "next/link";

export default function ArticleTable({
    articles,
}: {
    articles: ArticleWithCategoryAuthor[];
}) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
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
                                {article.createdAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {article.updatedAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="block text-blue-800 animate-pulse border p-1 border-blue-800 hover:bg-blue-200"
                                >
                                    <Pencil />
                                </Link>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
