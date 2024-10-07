"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await fetch(
          `/api/user/profile-newsletter-preference?userId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setIsSubscribed(data.newsletter);
        }
      } catch (error) {
        console.error("Error fetching newsletter preference:", error);
      }
    };

    fetchPreference();
  }, [userId]);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile-newsletter-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newsletter: !isSubscribed }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(data.newsletter);
      }
    } catch (error) {
      console.error("Error updating newsletter preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-white">Subscribe to newsletter</span>
      <Switch
        checked={isSubscribed}
        onCheckedChange={handleToggle}
        disabled={isLoading}
      />
    </div>
  );
}
