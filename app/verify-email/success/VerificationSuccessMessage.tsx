"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function VerificationSuccessMessage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in"); // Redirect to sign-in page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 bg-gray-100 sm:px-6 lg:px-8">
      <main className="w-full max-w-md bg-white shadow-sm rounded-lg px-4 py-8 sm:px-10">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Successful Verification
        </h1>
        <p className="text-sm text-gray-700 text-center mb-2">
          Your email has been successfully verified.
        </p>
        <p className="text-sm text-gray-600 text-center">
          Redirecting to sign-in page...
        </p>
      </main>
    </div>
  );
}
