"use client";

import React from "react";
import { Subscription } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface ProfileSubscriptionInfoProps {
  subscription: Subscription | null;
  onCancelSubscription: () => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  error: string | null;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function ProfileSubscriptionInfo({
  subscription,
  onCancelSubscription,
  isLoading,
  error,
}: ProfileSubscriptionInfoProps) {
  if (!subscription) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Your Subscription
        </h2>
        <p className="text-white text-center">
          You don't have an active subscription.
        </p>
      </div>
    );
  }

  const now = new Date();
  const expiresAt = new Date(subscription.expiresAt);
  const startedAt = new Date(subscription.createdAt);
  const isActive = subscription.status === "ACTIVE" && expiresAt > now;

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      await onCancelSubscription();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Your Subscription
      </h2>
      <div className="space-y-4 bg-white bg-opacity-20 p-6 rounded-md">
        <p className="text-white flex justify-between">
          <span>Status:</span>
          <span
            className={
              isActive
                ? "text-green-400 font-semibold"
                : "text-red-400 font-semibold"
            }
          >
            {subscription.status}
          </span>
        </p>
        <p className="text-white flex justify-between">
          <span>Subscribed on:</span>
          <span className="font-semibold">{formatDate(startedAt)}</span>
        </p>
        <p className="text-white flex justify-between">
          <span>Expires on:</span>
          <span className="font-semibold">{formatDate(expiresAt)}</span>
        </p>
        {subscription.cancelledAt && (
          <p className="text-white flex justify-between">
            <span>Cancelled on:</span>
            <span className="font-semibold">
              {formatDate(subscription.cancelledAt)}
            </span>
          </p>
        )}
        <p className="text-white flex justify-between">
          <span>Price:</span>
          <span className="font-semibold">
            ${(subscription.priceInCents / 100).toFixed(2)}
          </span>
        </p>
      </div>
      {isActive && (
        <Button
          onClick={handleCancelSubscription}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {isLoading ? "Cancelling..." : "Cancel Subscription"}
        </Button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
