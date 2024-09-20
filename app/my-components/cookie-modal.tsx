"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CookieModal() {
    const [show, setShow] = useState(true);

    function handleDecline() {
        setShow(false);
    }

    function handleAccept() {
        setShow(false);
    }

    return (
        <>
            {show && (
                <div
                    className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0
        flex justify-center items-center"
                >
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-gray-800 text-white text-center shadow-lg z-50">
                        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
                            <p className="text-lg font-semibold">
                                We value your privacy!
                            </p>
                            <p>
                                This website uses cookies to enhance your
                                browsing experience, provide personalized
                                content, and analyze site traffic. Cookies help
                                us understand how you interact with our website,
                                improve functionality, and deliver relevant
                                content.
                            </p>
                            <p>
                                By clicking &quot;Accept&quot;, you agree to the
                                use of all cookies. If you prefer to decline
                                non-essential cookies, you can do so by clicking
                                &quot;Decline&quot;. Learn more about how we use
                                cookies and how you can control them by visiting
                                our{" "}
                                <a href="/privacy-policy" className="underline">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                            <div className="flex space-x-4">
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                                    onClick={handleAccept}
                                >
                                    Accept
                                </Button>
                                <Button
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
                                    onClick={handleDecline}
                                >
                                    Decline
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
