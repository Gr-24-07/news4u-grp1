"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AccountDeletedHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const accountDeleted = searchParams.get("accountDeleted");
    if (accountDeleted === "true" && !showMessage) {
      setShowMessage(true);
      document.body.style.overflow = "hidden";
      signOut({ redirect: false });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("accountDeleted");
      window.history.replaceState({}, "", newUrl);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchParams, showMessage]);

  const handleClose = () => {
    setShowMessage(false);
    document.body.style.overflow = "";
    router.push("/");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!showMessage) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg max-w-md text-center relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white hover:text-gray-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
        <h2 className="text-2xl font-bold mb-4">Account Deleted</h2>
        <p>Your account has been successfully deleted.</p>
        <p>You can now close this window.</p>
      </div>
    </div>
  );
}
