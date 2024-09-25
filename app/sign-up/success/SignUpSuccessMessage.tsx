"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SignUpSuccessMessage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(timer);
          router.push("/sign-in");
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-2">
      <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 text-center text-white">
        <CheckCircle className="mb-6 h-16 w-16 text-green-400" />
        <h1 className="text-4xl font-bold mb-4">Sign-up Successful!</h1>
        <p className="font-semibold mb-2">
          Please check your email to verify your account.
        </p>
        <p className="font-semibold underline mb-6">The verification-link will expire in 24 hours.</p>
        <p className="mb-2">
          Once verified, you'll be able to sign in and access all features.
        </p>
        <p className="mt-4 flex items-center">
          Redirecting to sign-in page in {secondsLeft} seconds...
          <ArrowRight className="ml-2 h-4 w-4" />
        </p>
      </main>
    </div>
  );
}
