import { Articles } from './types';

type ArticleCardProps = { article: Articles };

export function ArticleCardLatestNews({ article }: ArticleCardProps) {
  return (
    <div>
      <h3 className="font-bold text-xl text-black hover:underline">{article.headline}</h3>
      <img
        src={article.image}
        alt={article.headline}
        className="w-full object-cover mt-2"
      />
      <p className="text-sm text-gray-800 whitespace-normal break-words pt-3">
        {article.summary}
      </p>
      <hr className="my-4 border-gray-300" /> 
    </div>
  );
}

export function ArticleCardPopularNews({ article }: ArticleCardProps) {
  return (
    <div>
      <h3 className="font-bold text-md text-black hover:underline">{article.headline}</h3>
      <img
        src={article.image}
        alt={article.headline}
        className="w-full object-cover mt-2"
      />
      <p className="text-sm text-gray-800 whitespace-normal break-words pt-2">
        {article.summary}
      </p>
      <hr className="my-4 border-gray-300" /> 
    </div>
  );
}

export function ArticleCardEditorChoice({ article }: ArticleCardProps) {
  return (
    <div>
      <h3 className="font-bold text-md text-black hover:underline">{article.headline}</h3>
      <p className="text-sm text-gray-800 whitespace-normal break-words pt-2">
        {article.summary}
      </p>
      <hr className="my-4 border-gray-300" /> 
    </div>
  );
}
