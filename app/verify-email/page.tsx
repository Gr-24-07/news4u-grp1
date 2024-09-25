"use client";

import { useEffect, useState } from "react";
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
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (isVerifying) return;
      setIsVerifying(true);

      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setError(
          "No verification token provided. Please check your email for the correct link."
        );
        setIsVerifying(false);
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
            router.push("/verify-email/success");
          }, 2000); // Delay for 2 seconds to show success message
        } else {
          setStatus("error");
          setError(getErrorMessage(data.error));
        }
      } catch (error) {
        setStatus("error");
        setError(
          "An error occurred while connecting to the server. Please try again later or contact support if the problem persists."
        );
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "INVALID_TOKEN":
      case "INVALID_OR_EXPIRED_TOKEN":
        return "This verification link is invalid or has expired. Please request a new one or try logging in if you have already verified your email.";
      case "EXPIRED_TOKEN":
        return "This verification link has expired. Please request a new one.";
      case "USER_NOT_FOUND":
        return "We couldn't find a user associated with this verification link. Please sign up or contact support if you believe this is an error.";
      case "VERIFICATION_FAILED":
        return "An error occurred during verification. Please try again later or contact support if the problem persists.";
      default:
        return "An unexpected error occurred. Please try again later or contact support if the problem persists.";
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-extrabold text-white text-center mb-6">
              Email Verification
            </h1>
            {status === "loading" && (
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-white animate-spin mx-auto mb-4" />
                <p className="text-white">Verifying your email...</p>
              </div>
            )}
            {status === "success" && (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-400">Email verified successfully!</p>
              </div>
            )}
            {status === "error" && (
              <div className="text-center">
                <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-400">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
