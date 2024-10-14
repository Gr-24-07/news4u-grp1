"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface ProfileNewsletterPreferencesProps {
  userId: string;
  initialPreference: boolean;
}

export default function ProfileNewsletterPreferences({
  userId,
  initialPreference,
}: ProfileNewsletterPreferencesProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialPreference);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile-newsletter-preference", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newsletter: !isSubscribed }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setIsSubscribed(updatedUserData.newsletter);
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to update newsletter preference:",
          errorData.error
        );
      }
    } catch (error) {
      console.error("Error updating newsletter preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="flex items-center justify-between w-full">
        <span className="text-2xl font-bold text-white">
          {isSubscribed
            ? "You are subscribed to our newsletter"
            : "You are not subscribed to our newsletter"}
        </span>
        <Switch
          checked={isSubscribed}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
