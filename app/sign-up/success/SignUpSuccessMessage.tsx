"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import AuthBackground from "@/app/my-components/AuthBackground";

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
    <AuthBackground>
      <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center text-black bg-white rounded-lg shadow-md border border-black my-8">
        <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
        <h1 className="text-4xl font-bold mb-4">Registration Successful!</h1>
        <p className="font-semibold mb-2">
          Please check your email to verify your account.
        </p>
        <p className="font-semibold underline mb-6 text-blue-600">
          The verification-link will expire in 24 hours.
        </p>
        <p className="mb-2 text-gray-700">
          Once verified, you'll be able to sign in and access all features.
        </p>
        <p className="mt-4 flex items-center text-gray-600">
          Redirecting to sign-in page in {secondsLeft} seconds...
          <ArrowRight className="ml-2 h-4 w-4" />
        </p>
      </main>
    </AuthBackground>
  );
}
