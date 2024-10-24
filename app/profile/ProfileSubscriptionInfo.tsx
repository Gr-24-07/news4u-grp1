"use client";

import React from "react";
import { Subscription } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

interface ProfileSubscriptionInfoProps {
    subscription: Subscription | null;
    onCancelSubscription: () => Promise<{ success: boolean; error?: string }>;
    onUpdateAutoRenew: (
        autoRenew: boolean
    ) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
    error: string | null;
}

function formatDate(date: Date): string {
    return new Date(date).toISOString().split("T")[0];
}

function getStatusDisplay(status: string, expiresAt: Date) {
    const now = new Date();
    if (status === "ACTIVE") {
        return <span className="text-green-600 font-semibold">ACTIVE</span>;
    } else if (status === "CANCELLED" && expiresAt > now) {
        return (
            <span>
                <span className="text-red-600 font-semibold">CANCELLED</span>{" "}
                <span className="text-green-600 font-semibold">
                    (Still Active)
                </span>
            </span>
        );
    } else {
        return <span className="text-red-600 font-semibold">{status}</span>;
    }
}

export default function ProfileSubscriptionInfo({
    subscription,
    onCancelSubscription,
    onUpdateAutoRenew,
    isLoading,
    error,
}: ProfileSubscriptionInfoProps) {
    if (!subscription) {
        return (
            <div className="text-black rounded-lg shadow-md border border-black p-6">
                <div className="border-b border-gray-400 pb-1 mb-8 mt-1">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Your Subscription
                    </h2>
                </div>
                <p className="text-center">
                    You don&apos;t have an active Subscription.
                </p>
                <p className="text-center mt-1">
                    Check out our Subscription-plans by clicking{" "}
                    <Link href="/subscribe">
                        <span className="hover:text-blue-600 italic underline">
                            here
                        </span>
                    </Link>
                    .
                </p>
            </div>
        );
    }

    const now = new Date();
    const expiresAt = new Date(subscription.expiresAt);
    const startedAt = new Date(subscription.createdAt);
    const isActive =
        subscription.status === "ACTIVE" ||
        (subscription.status === "CANCELLED" && expiresAt > now);

    const handleCancelSubscription = async () => {
        if (
            window.confirm(
                "Are you sure you want to cancel your subscription? You'll still have access until the end of your current billing period."
            )
        ) {
            await onCancelSubscription();
        }
    };

    const handleAutoRenewToggle = async () => {
        if (!subscription.autoRenew && subscription.status === "CANCELLED") {
            if (
                window.confirm(
                    "Would you like to reactivate your subscription? This will remove the cancellation and continue your subscription."
                )
            ) {
                await onUpdateAutoRenew(true);
            }
        } else {
            await onUpdateAutoRenew(!subscription.autoRenew);
        }
    };

    return (
        <div className="space-y-4 text-black">
            <div className="bg-white border border-black p-6 rounded-md">
                <div className="border-b border-gray-400 pb-1 mb-8 mt-1">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Your Subscription
                    </h2>
                </div>
                <div className="space-y-4">
                    <p className="flex justify-between items-center">
                        <span>Status:</span>
                        {getStatusDisplay(subscription.status, expiresAt)}
                    </p>
                    <p className="flex justify-between">
                        <span>Subscribed on:</span>
                        <span className="font-semibold">
                            {formatDate(startedAt)}
                        </span>
                    </p>
                    <p className="flex justify-between">
                        <span>Expires on:</span>
                        <span className="font-semibold">
                            {formatDate(expiresAt)}
                        </span>
                    </p>
                    {subscription.cancelledAt && (
                        <p className="flex justify-between">
                            <span>Cancelled on:</span>
                            <span className="font-semibold">
                                {formatDate(subscription.cancelledAt)}
                            </span>
                        </p>
                    )}
                    <p className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold">
                            ${(subscription.priceInCents / 100).toFixed(2)}
                        </span>
                    </p>
                    <div className="flex items-center justify-between">
                        <span>Auto-renew</span>
                        <Switch
                            checked={subscription.autoRenew}
                            onCheckedChange={handleAutoRenewToggle}
                            disabled={!isActive && expiresAt <= now}
                        />
                    </div>
                    {subscription.status === "ACTIVE" && (
                        <Button
                            onClick={handleCancelSubscription}
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-4"
                        >
                            {isLoading
                                ? "Cancelling..."
                                : "Cancel Subscription"}
                        </Button>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
