"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/app/my-components/AuthBackground";
import { CheckCircle } from "lucide-react";

export default function VerificationSuccessMessage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in"); // Redirect to sign-in page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AuthBackground>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-black my-8">
        <div className="px-6 py-8 flex flex-col items-center">
          <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
          <h1 className="text-3xl font-extrabold text-black text-center mb-6">
            Successful Verification
          </h1>
          <p className="text-sm text-gray-700 text-center mb-2">
            Your email has been successfully verified.
          </p>
          <p className="text-sm text-gray-500 text-center">
            Redirecting to sign-in page...
          </p>
        </div>
      </div>
    </AuthBackground>
  );
}
