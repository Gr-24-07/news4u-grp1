"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation

export default function SubscriptionModal({ articleUrl, children }: { articleUrl: string, children: React.ReactNode }) {
    const [show, setShow] = useState(false);
    const router = useRouter();

    // Show modal when article is clicked
    function handleArticleClick(e: React.MouseEvent) {
        e.preventDefault(); // Prevent immediate navigation
        setShow(true); // Show subscription modal
    }

    // Handle subscription
    async function handleSubscribe() {
        setShow(false);
        router.push(articleUrl); // After subscribing, navigate to the article
    }

    // Handle dismissal - now redirects to the homepage
    function handleDismiss() {
        setShow(false);
        router.push('/'); // Navigate to homepage when dismissed
    }

    return (
        <>
            <a href={articleUrl} onClick={handleArticleClick}>
                {children} {/* Article content passed as children */}
            </a>

            {show && (
                <div className="bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-gray-800 text-white text-center shadow-lg transform transition-transform">
                        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
                            <p className="text-lg font-semibold">Subscribe to Our News4U!</p>
                            <p>Get updates, articles, and exclusive content directly to your inbox.</p>
                            <div className="flex space-x-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                                    onClick={handleDismiss} // Redirects to homepage
                                >
                                    Subscribe
                                </button>
                                <button
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
                                    onClick={handleDismiss} // Redirects to homepage
                                >
                                    No Thanks
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}