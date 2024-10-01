"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ProfileNewsletterPreferencesProps {
  userId: string;
  currentPreference: boolean;
}

export default function ProfileNewsletterPreferences({
  userId,
  currentPreference,
}: ProfileNewsletterPreferencesProps) {
  const [isSubscribed, setIsSubscribed] = useState(currentPreference);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/user/profile-newsletter-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, preference: !isSubscribed }),
      });

      if (response.ok) {
        setIsSubscribed(!isSubscribed);
        // Success toast removed from here
      } else {
        const errorData = await response.json();
        console.error("Failed to update newsletter preference:", errorData);
        toast({
          title: "Error",
          description:
            errorData.error || "Failed to update newsletter preference",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating newsletter preference:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        Newsletter Preferences
      </h2>
      <div className="flex items-center justify-between">
        <span className="text-white">Receive personalized newsletter</span>
        <Switch
          checked={isSubscribed}
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className="bg-indigo-600"
        />
      </div>
    </div>
  );
}
