import { Subscription } from "@prisma/client";

interface ProfileSubscriptionInfoProps {
  subscription: Subscription | null;
}

export default function ProfileSubscriptionInfo({
  subscription,
}: ProfileSubscriptionInfoProps) {
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
  const isActive = expiresAt > new Date();

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
        <p className="text-white">
          Expires on: {expiresAt.toLocaleDateString()}
        </p>
        <p className="text-white">
          Price: ${(subscription.priceInCents / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
