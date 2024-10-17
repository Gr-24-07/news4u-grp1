"use client";

import { Articles } from './types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkUserSubscription } from './checkUserSubscription';
import SubscriptionModal from './SubscriptionModal';
import Image from 'next/image';

type ArticleCardProps = {
  article: Articles;
  userId: string;
};

// Latest News Card 
export function ArticleCardLatestNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        setShowModal(true); 
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false); 
  };

  const handleSubscribeRedirect = () => {
    setShowModal(false);
    router.push('/subscribe'); 
  };

  return (
    <div className="cursor-pointer">
      <h3 className="font-bold text-xl text-black hover:underline " onClick={handleClick}>
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="w-full h-auto object-cover hover:scale-105 duration-200 mt-5"
        onClick={handleClick}
      />
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2">{article.summary}</p>
      <p className="text-xs text-gray-500 pt-1 mt-2 ">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />

      {/* Show Subscription Modal */}
      {showModal && (
        <SubscriptionModal
          articleUrl={`/article-page/${article.id}`}
          onClose={handleModalClose}
          onSubscribe={handleSubscribeRedirect}
        />
      )}
    </div>
  );
}

// Popular News Card
export function ArticleCardPopularNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        setShowModal(true); 
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleSubscribeRedirect = () => {
    setShowModal(false);
    router.push('/subscribe');
  };

  return (
    <div className="cursor-pointer">
      <h3 className="font-bold text-md text-black hover:underline" onClick={handleClick}>
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="object-cover hover:scale-105 duration-200 mt-5"
        onClick={handleClick}
      />
      <p className="text-xs text-gray-700 whitespace-normal break-words pt-1 mt-2">{article.summary}</p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />

      {showModal && (
        <SubscriptionModal
          articleUrl={`/article-page/${article.id}`}
          onClose={handleModalClose}
          onSubscribe={handleSubscribeRedirect}
        />
      )}
    </div>
  );
}

// Editor's Choice Card
export function ArticleCardEditorChoice({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        setShowModal(true); 
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleSubscribeRedirect = () => {
    setShowModal(false);
    router.push('/subscribe');
  };

  return (
    <div className="cursor-pointer">
      <h3 className="font-bold text-sm text-black hover:underline" onClick={handleClick}>
        {article.headline}
      </h3>
      <div >
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="object-cover mt-5 hover:scale-105 duration-200"
        onClick={handleClick}
      />
      </div>
      <p className="text-xs text-gray-700 whitespace-normal break-words pt-1 mt-2">{article.summary}</p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />

      {showModal && (
        <SubscriptionModal
          articleUrl={`/article-page/${article.id}`}
          onClose={handleModalClose}
          onSubscribe={handleSubscribeRedirect}
        />
      )}
    </div>
  );
}

// Live News Card 
export function ArticleCardLiveNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const handleClick = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      const hasSubscription = await checkUserSubscription(userId);
      if (hasSubscription) {
        router.push(`/article-page/${article.id}`);
      } else {
        setShowModal(true); 
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false); 
  };

  const handleSubscribeRedirect = () => {
    setShowModal(false);
    router.push('/subscribe'); 
  };

  return (
    <div className="cursor-pointer">
      <h3 className="font-bold text-xl text-black hover:underline " onClick={handleClick}>
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="w-full h-auto object-cover hover:scale-105 duration-200 mt-5 pl-10 pr-10"
        onClick={handleClick}
      />
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2">{article.summary}</p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />

      {/* Show Subscription Modal */}
      {showModal && (
        <SubscriptionModal
          articleUrl={`/article-page/${article.id}`}
          onClose={handleModalClose}
          onSubscribe={handleSubscribeRedirect}
        />
      )}
    </div>
  );
}

