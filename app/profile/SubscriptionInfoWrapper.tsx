"use client";

import { Subscription } from "@prisma/client";
import ProfileSubscriptionInfo from "./ProfileSubscriptionInfo";
import { useRouter } from "next/navigation";
import {
  useCancelSubscription,
  useUpdateAutoRenew,
} from "@/hooks/useSubscription";

interface SubscriptionInfoWrapperProps {
  subscription: Subscription | null;
  userId: string;
}

export default function SubscriptionInfoWrapper({
  subscription,
  userId,
}: SubscriptionInfoWrapperProps) {
  const router = useRouter();
  const {
    cancelSubscription,
    isLoading: isCancelling,
    error: cancelError,
  } = useCancelSubscription();
  const {
    updateAutoRenew,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateAutoRenew();

  const handleCancelSubscription = async () => {
    const result = await cancelSubscription(userId);
    if (result.success) {
      router.refresh();
    }
    return result;
  };

  const handleUpdateAutoRenew = async (autoRenew: boolean) => {
    const result = await updateAutoRenew(userId, autoRenew);
    if (result.success) {
      router.refresh();
    }
    return result;
  };

  return (
    <ProfileSubscriptionInfo
      subscription={subscription}
      onCancelSubscription={handleCancelSubscription}
      onUpdateAutoRenew={handleUpdateAutoRenew}
      isLoading={isCancelling || isUpdating}
      error={cancelError || updateError}
    />
  );
}
