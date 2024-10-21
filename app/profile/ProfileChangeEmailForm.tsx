"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const changeEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type MessageType = {
  type: "success" | "error";
  text: string;
} | null;

export default function ProfileChangeEmailForm() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<MessageType>(null);

  useEffect(() => {
    const fetchCurrentEmail = async () => {
      try {
        console.log("Fetching current email...");
        const response = await fetch("/api/user/profile-current-email");
        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Received data:", data);
          setCurrentEmail(data.email);
        } else {
          console.error("Failed to fetch current email");
          const errorData = await response.json();
          console.error("Error data:", errorData);
        }
      } catch (error) {
        console.error("Error fetching current email:", error);
      }
    };

    fetchCurrentEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      changeEmailSchema.parse({ newEmail, password });

      const response = await fetch("/api/user/profile-change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail, password }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Email change request submitted. Please check your new email for verification.",
        });
        setNewEmail("");
        setPassword("");
      } else {
        const data = await response.json();
        setMessage({
          type: "error",
          text: data.error || "Failed to change email",
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
        <h2 className="text-2xl font-bold mb-4 text-center">Change Email</h2>
      </div>

      {currentEmail !== null && (
        <div className="pb-4 mb-4 border-b border-gray-400">
          <div className="flex items-center">
            <div className="flex items-center mb-3">
              <label className="text-sm font-medium mr-1">Current Email:</label>
              <p>{currentEmail}</p>
            </div>
          </div>
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
        <label htmlFor="newEmail" className="block text-sm font-medium">
          New Email
        </label>
        <Input
          id="newEmail"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Current Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center"
      >
        {isSubmitting ? "Submitting..." : "Update Email"}
      </Button>
    </form>
  );
}
