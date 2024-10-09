import { Articles } from './types';
import SubscriptionModal from './SubscriptionModal'; // Import the modal

type ArticleCardProps = { article: Articles };

// Shared ArticleCard component with subscription modal
const ArticleCard = ({ article }: ArticleCardProps) => {

  return (
    <div>
      <SubscriptionModal articleUrl={`/article-page/${article.id}`}>
        {/* Article Content */}
        <h3 className="font-bold text-xl text-black hover:underline">{article.headline}</h3>
        <img
          src={article.image}
          alt={article.headline}
          className="w-full object-cover mt-2"
        />
        <p className="text-sm text-gray-800 whitespace-normal break-words pt-3">
          {article.summary}
        </p>
      </SubscriptionModal>
      <hr className="my-4 border-gray-300" /> 
    </div>
  );
};

// Individual article card components
export function ArticleCardLatestNews({ article }: ArticleCardProps) {
  return (
    <div>
      <ArticleCard article={article} />
    </div>
  );
}

export function ArticleCardPopularNews({ article }: ArticleCardProps) {
  return (
    <div>
      <ArticleCard article={article} />
    </div>
  );
}

export function ArticleCardEditorChoice({ article }: ArticleCardProps) {
  return (
    <div>
      <ArticleCard article={article} />
    </div>
  );
}
