"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SignUpSuccessMessage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in"); // Redirect to home page after 30 seconds
    }, 30000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Sign-up Successful!</h1>
        <p className="font-bold">
          Please check your email to verify your account.
        </p>
        <p className="font-bold underline mb-6">The verification-link will expire in 24 hours.</p>
        <p className="mb-2">
          Once verified, you'll be able to sign in and access all features.
        </p>
        <p className="mt-4">
          You will now be redirected to the sign-in page...
        </p>
      </main>
    </div>
  );
}
