"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthBackground from "@/app/my-components/AuthBackground";

export default function VerifyEmailSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/profile");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AuthBackground>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-black text-center mb-6">
              Email Change Verified Successfully
            </h1>
            <p className="text-gray-700 text-center">
              Your new email has been verified. You will be redirected to your
              profile page in 5 seconds.
            </p>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
