import { getArticle } from "@/app/data/articles";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) return;
  <div>Article Not Found</div>;

  const article = await getArticle(params.id);
  const markup = { __html: article?.content || "" };

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full mx-auto items-center prose max-w-2xl lg:prose-lg lg:prose-h1:text-3xl prose-h1:font-bold py-8">
      <h1>{article?.headline}</h1>

      <p>{`${article?.author.firstName} ${article?.author.lastName}`}</p>
      <div className="relative object-contain">
        <Image
          src={article?.image}
          alt="img"
          width={500}
          height={500}
          className="min-h-[60vh] lg:min-h-[40vh] object-scale-down w-auto"
        />
      </div>

      <div className="" dangerouslySetInnerHTML={markup} />
    </div>
  );
}
