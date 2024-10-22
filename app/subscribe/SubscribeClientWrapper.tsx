"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NewsSubscriptionCardGradient } from "@/components/news-subscription-card-gradient";
import { Prisma } from "@prisma/client";

type SubscriptionType = Prisma.SubscriptionTypeGetPayload<{}>;

interface SubscribeClientWrapperProps {
    subscriptionTypes: SubscriptionType[];
    userId: string;
    isResubscribing: boolean;
    subscriptionStatus?: string;
}

export default function SubscribeClientWrapper({
    subscriptionTypes,
    userId,
    isResubscribing,
    subscriptionStatus,
}: SubscribeClientWrapperProps) {
    const router = useRouter();

    return (
        <>
            {isResubscribing && (
                <p className="text-center">
                    {subscriptionStatus === "CANCELLED"
                        ? "Your previous subscription has been cancelled. You can choose a new subscription below."
                        : "Your previous subscription has expired. You can choose a new subscription below."}
                </p>
            )}
            <div className="flex justify-center gap-2 px-4">
                {subscriptionTypes.map((subscriptionType) => (
                    <NewsSubscriptionCardGradient
                        key={subscriptionType.id}
                        subscriptionType={subscriptionType}
                        onSubscribe={() => {
                            router.push(`/subscribe/${subscriptionType.slug}`);
                        }}
                    />
                ))}
            </div>
        </>
    );
}
