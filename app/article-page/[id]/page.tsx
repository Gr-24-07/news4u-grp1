"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SubscriptionModal from "@/app/front-page/SubscriptionModal";
import { checkUserSubscription } from "@/app/front-page/checkUserSubscription";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession(); // Use NextAuth session
  
  const userId = session?.user?.id; // Extract userId from session

  // Fetch the article details
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setArticle(data);
        } else {
          console.error("Article not found");
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  // Check subscription status after article is shown
  useEffect(() => {
    const checkSubscription = async () => {
      if (userId) {
        const hasSubscription = await checkUserSubscription(userId);
        //console.log(userId)
        //console.log(hasSubscription)
        setShowModal(!hasSubscription);
      }
      else{
        router.push('/subscribe')
      }
    };

    // 5-second delay to check the subscription status
    const timer = setTimeout(checkSubscription, 5000);

    return () => {clearTimeout(timer);
    };
  }, [userId, router]);

  useEffect(() => {
    if(showModal){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return() => {
      (document.body.style.overflow = "auto");
    };
  }, [showModal]);

  if (loading) return <div>Loading article...</div>;
  if (!article) return <div>Article not found.</div>;

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/');
  };

  const handleSubscribeRedirect = () => {
    setShowModal(false);
    router.push("/subscribe");
  };

  return (
    <div className="w-full mx-auto items-center prose max-w-2xl lg:prose-lg lg:prose-h1:text-3xl prose-h1:font-bold py-8">
      <h1>{article.headline}</h1>
      <p>{`${article.author.firstName} ${article.author.lastName}`}</p>
      <div className="relative object-contain">
        <Image
          src={article.image}
          alt={article.headline || "Article image"}
          width={500}
          height={500}
          className="min-h-[60vh] lg:min-h-[40vh] object-scale-down w-auto"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: article.content || "" }} />

      {/* Show the subscription modal if the user is not subscribed */}
      {showModal && (
        <SubscriptionModal
          onSubscribe={handleSubscribeRedirect}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
