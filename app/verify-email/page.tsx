"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import AuthBackground from "../my-components/AuthBackground";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setError(
          "No verification token provided. Please check your email for the correct link."
        );
        return;
      }

      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setTimeout(() => {
            router.push("/profile");
          }, 2000);
        } else {
          setStatus("error");
          setError(data.error || "An error occurred during verification.");
        }
      } catch (error) {
        setStatus("error");
        setError(
          "An error occurred while connecting to the server. Please try again later or contact support if the problem persists."
        );
      }
    };
    verifyEmail();
  }, [searchParams, router]);

  return (
    <AuthBackground>
      <div className="w-full max-w-md rounded-lg shadow-md border border-black">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-black text-center mb-6">
              Email Verification
            </h1>
            {status === "loading" && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-700">Verifying your email...</p>
              </div>
            )}
            {status === "success" && (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-green-600">Email verified successfully!</p>
              </div>
            )}
            {status === "error" && (
              <div className="text-center">
                <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
