"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/app/my-components/AuthBackground";


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
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-white text-center mb-6">
              Successful Verification
            </h1>
            <p className="text-sm text-gray-200 text-center mb-2">
              Your email has been successfully verified.
            </p>
            <p className="text-sm text-gray-300 text-center">
              Redirecting to sign-in page...
            </p>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}