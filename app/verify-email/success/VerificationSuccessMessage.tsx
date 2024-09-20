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
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Successful Verification</h1>
        <p>Your email has been successfully verified.</p>
        <p>Redirecting to sign-in page...</p>
      </main>
    </div>
  );
}
