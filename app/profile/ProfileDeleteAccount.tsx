"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileDeleteAccountProps {
  hasActiveSubscription: boolean;
}

export default function ProfileDeleteAccount({
  hasActiveSubscription,
}: ProfileDeleteAccountProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/profile-delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Please check your email to confirm account deletion.",
        });
        setPassword("");
      } else {
        const data = await response.json();
        setMessage({
          type: "error",
          text: data.error || "Failed to initiate account deletion",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-black bg-white border border-black p-6 rounded-md"
    >
      <div className="border-b border-gray-400 pb-1 mb-8 mt-1">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Account</h2>
      </div>

      <p className="text-black mb-4">
        This action is irreversible. Please enter your password to initiate
        account deletion.
      </p>

      {hasActiveSubscription && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Warning</p>
          <p>
            You have an active subscription. Deleting your account will cancel
            your subscription and you will lose access to all premium features.
          </p>
        </div>
      )}

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p>{message.text}</p>
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Current Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="mt-1 bg-white border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
      >
        {isSubmitting ? "Submitting..." : "Initiate Account Deletion"}
      </Button>
    </form>
  );
}
