"use client";

import { Articles } from './types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

type ArticleCardProps = {
  article: Articles;
  userId: string;
};

// Latest News Card 
export function ArticleCardLatestNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) 
      return;
    setIsNavigating(true);
    router.push(`/article-page/${article.id}`);
  }

  return (
    <div className="cursor-pointer"  onClick={handleClick}>
      <h3 className="font-bold text-lg text-black hover:underline " >
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="w-full h-auto object-cover hover:scale-105 duration-200 mt-5"
      />
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2" >
        {article.summary}
      </p>
      <p className="text-xs text-gray-500 pt-1 mt-2 ">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />

    </div>
  );
}

// Popular News Card
export function ArticleCardPopularNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) 
      return;
    setIsNavigating(true);
      router.push(`/article-page/${article.id}`);
  }

  return (
    <div className="cursor-pointer"  onClick={handleClick}>
      <h3 className="font-bold text-base text-black hover:underline" >
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="object-cover hover:scale-105 duration-200 mt-5"
      />
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2" >
        {article.summary}
      </p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />
    </div>
  );
}

// Editor's Choice Card
export function ArticleCardEditorChoice({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating)
      return;
    setIsNavigating(true);
        router.push(`/article-page/${article.id}`);
}

  return (
    <div className="cursor-pointer"  onClick={handleClick}>
      <h3 className="font-bold text-base text-black hover:underline">
        {article.headline}
      </h3>
      <div >
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="object-cover mt-5 hover:scale-105 duration-200"
      />
      </div>
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2" >
        {article.summary}
      </p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />
    </div>
  );
}

// Live News Card 
export function LiveNewsCard({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) 
      return;
    setIsNavigating(true);
        router.push(`/article-page/${article.id}`);
}

  return (
    <div className="cursor-pointer"  onClick={handleClick}>
      <h3 className="font-bold text-xl text-black hover:underline " >
        {article.headline}
      </h3>
      <Image 
        src={article.image} 
        alt={article.headline} 
        width={900}  
        height={315} 
        className="w-full h-auto object-cover hover:scale-105 duration-200 mt-5"
      />
      <p className="text-base text-gray-700 whitespace-normal break-words pt-3 mt-2" >
        {article.summary}
      </p>
      <p className="text-xs text-gray-500 pt-1 mt-2">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4 border-gray-300" />
    </div>
  );
}

// All News Card 
export function AllLatestNews({ article, userId }: ArticleCardProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = async () => {
    if (isNavigating) 
      return;
    setIsNavigating(true);
        router.push(`/article-page/${article.id}`);
  }

  return (
    <div className="cursor-pointer"  onClick={handleClick}>
      <h3 className="font-bold text-sm md:text-base text-black hover:underline ml-1" >
        {article.headline}
      </h3>
      <Image 
        src={article.image}
        alt={article.headline} 
        width={900}  
        height={315} 
        className="w-full h-auto object-cover hover:scale-105 duration-200 mt-5 ml-1"
      />
      <p className="text-sm text-gray-700 whitespace-normal break-words pt-3 mt-2 ml-1" >
        {article.summary}
      </p>
      <p className="text-xs text-gray-500 pt-1 mt-2 ml-1 ">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}