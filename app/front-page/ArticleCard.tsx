export default function ArticleCard({ article }) {
    return (
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="font-bold text-lg text-red-500">{article.headline}</h3>
        <img
          src={article.image}
          alt={article.headline}
          className="w-full object-cover rounded-md mt-2"
        />
        <p className="text-sm text-black whitespace-normal break-words">
          {article.summary}
        </p>
      </div>
    );
  }
