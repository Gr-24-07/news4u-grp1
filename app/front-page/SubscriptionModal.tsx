"use client";

import { useRouter } from "next/navigation";

type SubscriptionModalProps = {
  articleUrl: string;
  onSubscribe: () => void;
};

export default function SubscriptionModal({ onSubscribe }: SubscriptionModalProps) {
  const router = useRouter();

  return (
    <div className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 flex justify-center items-center z-50">
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gray-800 text-white text-center shadow-lg transform transition-transform">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">Subscribe to News4U!</p>
          <p>Unlock this article and get exclusive content by subscribing.</p>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
              onClick={onSubscribe} // Redirect to subscription page
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
