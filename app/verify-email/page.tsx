"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
          switch (data.error) {
            case "INVALID_TOKEN":
            case "INVALID_OR_EXPIRED_TOKEN":
              setError(
                "This verification link is invalid or has expired. Please request a new one or try logging in if you have already verified your email."
              );
              break;
            case "EXPIRED_TOKEN":
              setError(
                "This verification link has expired. Please request a new one."
              );
              break;
            case "USER_NOT_FOUND":
              setError(
                "We couldn't find a user associated with this verification link. Please sign up or contact support if you believe this is an error."
              );
              break;
            case "VERIFICATION_FAILED":
              setError(
                "An error occurred during verification. Please try again later or contact support if the problem persists."
              );
              break;
            default:
              setError(
                "An unexpected error occurred. Please try again later or contact support if the problem persists."
              );
          }
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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Email Verification
        </h1>
        {status === "loading" && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-black">Verifying your email...</p>
          </div>
        )}
        {status === "success" && (
          <div>
            <svg
              className="h-12 w-12 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-600">Email verified successfully!</p>
          </div>
        )}
        {status === "error" && (
          <div>
            <svg
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
