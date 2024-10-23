"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/app/my-components/AuthBackground";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function SuccessMessage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to home page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AuthBackground>
      <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center text-black bg-white rounded-lg shadow-md border border-black my-8">
        <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
        <h1 className="text-4xl font-bold mb-4">You are now signed in</h1>
        <p className="font-semibold mb-2">
          Thank you for signing in to your account.
        </p>
        <p className="mt-4 flex items-center text-gray-600">
          Redirecting to home page...
          <ArrowRight className="ml-2 h-4 w-4" />
        </p>
      </main>
    </AuthBackground>
  );
}
