"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

export default function ProfileResetPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
      resetPasswordSchema.parse({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      const response = await fetch("/api/user/profile-reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Password updated successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        const data = await response.json();
        setMessage({
          type: "error",
          text: data.error || "Failed to update password",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setMessage({ type: "error", text: err.errors[0].message });
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      }
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
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
      </div>
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
        <label htmlFor="currentPassword" className="block text-sm font-medium">
          Current Password
        </label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirmNewPassword"
          className="block text-sm font-medium"
        >
          Confirm New Password
        </label>
        <Input
          id="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center"
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
      <div className="flex items-center w-full">
        <div className="flex-grow border-t border-gray-400"></div>
        <div className="mx-4 text-sm font-light text-gray-600">OR</div>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <Link
        href="/forgot-password"
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Forgot password?
      </Link>
    </form>
  );
}
