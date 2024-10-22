import { getArticles } from "@/app/data/articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ArticlesPage() {
    const data = await getArticles();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Articles</h1>
            <Button asChild className="w-36 self-end">
                <Link href="/admin/articles/create">Create New Article</Link>
            </Button>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
