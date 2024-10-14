"use client";

import { Subscription } from "@prisma/client";
import ProfileSubscriptionInfo from "./ProfileSubscriptionInfo";

interface SubscriptionInfoWrapperProps {
  subscription: Subscription | null;
  userId: string;
  onCancelSubscription: (
    userId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export default function SubscriptionInfoWrapper({
  subscription,
  userId,
  onCancelSubscription,
}: SubscriptionInfoWrapperProps) {
  return (
    <ProfileSubscriptionInfo
      subscription={subscription}
      onCancelSubscription={() => onCancelSubscription(userId)}
    />
  );
}

(SubscriptionInfoWrapper as any).displayName = "SubscriptionInfoWrapper";
