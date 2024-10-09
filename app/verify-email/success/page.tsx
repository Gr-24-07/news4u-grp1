"use client";

import React from "react";
import { useRouter } from "next/navigation";
import VerificationSuccessMessage from "./VerificationSuccessMessage";

export default function VerifyEmailSuccessPage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in"); // Redirect to sign-in page after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return <VerificationSuccessMessage />;
}
