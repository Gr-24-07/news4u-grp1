"use client";

import { Articles } from './types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkUserSubscription } from './checkUserSubscription';

type ArticleCardProps = { 
  article: Articles;
  userId: string; 
};

// Latest News Card
export function ArticleCardLatestNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        router.push('/subscribe');
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <h3 className="font-bold text-xl text-black hover:underline">{article.headline}</h3>
      <img src={article.image} alt={article.headline} className="w-full object-cover mt-2" />
      <p className="text-sm text-gray-800 whitespace-normal break-words pt-3">{article.summary}</p>
      <hr className="my-4 border-gray-300" />
    </div>
  );
}

// Popular News Card
export function ArticleCardPopularNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        router.push('/subscribe');
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <h3 className="font-bold text-md text-gray-900 hover:underline">{article.headline}</h3>
      <img src={article.image} alt={article.headline} className="w-full object-cover mt-2" />
      <p className="text-xs text-gray-700 whitespace-normal break-words pt-1">{article.summary}</p>
    </div>
  );
}

// Editor's Choice Card
export function ArticleCardEditorChoice({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        router.push('/subscribe');
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <h3 className="font-bold text-sm text-gray-900 hover:underline">{article.headline}</h3>
      <img src={article.image} alt={article.headline} className="w-full object-cover mt-2" />
      <p className="text-xs text-gray-700 whitespace-normal break-words pt-1">{article.summary}</p>
    </div>
  );
}
