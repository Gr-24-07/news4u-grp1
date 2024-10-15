"use client";

import { Subscription } from "@prisma/client";
import ProfileSubscriptionInfo from "./ProfileSubscriptionInfo";
import { useRouter } from "next/navigation";
import { useCancelSubscription } from "@/hooks/useSubscription";

interface SubscriptionInfoWrapperProps {
  subscription: Subscription | null;
  userId: string;
}

export default function SubscriptionInfoWrapper({
  subscription,
  userId,
}: SubscriptionInfoWrapperProps) {
  const router = useRouter();
  const { cancelSubscription, isLoading, error } = useCancelSubscription();

  const handleCancelSubscription = async () => {
    const result = await cancelSubscription(userId);
    if (result.success) {
      router.refresh();
    }
    return result;
  };

  return (
    <ProfileSubscriptionInfo
      subscription={subscription}
      onCancelSubscription={handleCancelSubscription}
      isLoading={isLoading}
      error={error}
    />
  );
}
