"use client";

import React, { useState } from "react";
import { Subscription } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ProfileSubscriptionInfoProps {
  subscription: Subscription | null;
  onCancelSubscription: () => Promise<{ success: boolean; error?: string }>;
}

// Helper function for consistent date formatting
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ProfileSubscriptionInfo({
  subscription,
  onCancelSubscription,
}: ProfileSubscriptionInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!subscription) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Your Subscription
        </h2>
        <p className="text-white">You don't have an active subscription.</p>
      </div>
    );
  }

  const expiresAt = new Date(subscription.expiresAt);
  const startedAt = new Date(subscription.createdAt);
  const isActive = expiresAt > new Date();
  const subscriptionDuration = Math.ceil(
    (expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      setIsLoading(true);
      try {
        const result = await onCancelSubscription();
        if (result.success) {
          alert("Your subscription has been cancelled successfully.");
        } else {
          alert(
            result.error ||
              "There was an error cancelling your subscription. Please try again."
          );
        }
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        alert(
          "There was an error cancelling your subscription. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Your Subscription</h2>
      <div className="space-y-2">
        <p className="text-white">
          Status:{" "}
          <span className={isActive ? "text-green-400" : "text-red-400"}>
            {isActive ? "Active" : "Expired"}
          </span>
        </p>
        <p className="text-white">Subscribed on: {formatDate(startedAt)}</p>
        <p className="text-white">Expires on: {formatDate(expiresAt)}</p>
        <p className="text-white">
          Duration: {subscriptionDuration} days remaining
        </p>
        <p className="text-white">
          Price: ${(subscription.priceInCents / 100).toFixed(2)}
        </p>
        {isActive && (
          <Button
            onClick={handleCancelSubscription}
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Subscription"}
          </Button>
        )}
      </div>
    </div>
  );
}
