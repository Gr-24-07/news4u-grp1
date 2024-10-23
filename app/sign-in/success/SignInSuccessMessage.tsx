"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import AuthBackground from "@/app/my-components/AuthBackground";

export default function SignInSuccessMessage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AuthBackground>
      <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center text-black bg-white rounded-lg shadow-md border border-black my-8">
        <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
        <h1 className="text-4xl font-bold mb-4">You are now signed in</h1>
        <p className="mt-4 flex items-center text-gray-600">
          Redirecting to home page...
          <ArrowRight className="ml-2 h-4 w-4" />
        </p>
      </main>
    </AuthBackground>
  );
}
