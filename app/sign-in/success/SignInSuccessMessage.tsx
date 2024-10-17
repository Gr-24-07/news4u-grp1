"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/app/my-components/AuthBackground";
import { CheckCircle } from "lucide-react";

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
      <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-white">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
          <h1 className="text-black text-4xl font-bold mb-4">
            You are now signed in
          </h1>
          <p className="text-gray-600">Redirecting to home page...</p>
        </main>
      </div>
    </AuthBackground>
  );
}
