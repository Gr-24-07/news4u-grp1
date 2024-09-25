"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { SubscriptionType } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface SubscriptionTypeProps {
    subscriptionType: SubscriptionType;
}

export function NewsSubscriptionCardGradient({
    subscriptionType,
}: SubscriptionTypeProps) {
    const formatDuration = (durationInSeconds: number) => {
        const days = Math.floor(durationInSeconds / (24 * 60 * 60));
        if (days >= 365) {
            const years = Math.floor(days / 365);
            return `${years} year${years > 1 ? "s" : ""}`;
        } else if (days >= 30) {
            const months = Math.floor(days / 30);
            return `${months} month${months > 1 ? "s" : ""}`;
        } else {
            return `${days} day${days > 1 ? "s" : ""}`;
        }
    };

    return (
        <Card className="w-[300px] h-[500px] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-200 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-b border-blue-300 h-[130px] flex flex-col justify-center">
                <CardTitle className="text-2xl font-bold truncate">
                    {subscriptionType.name}
                </CardTitle>
                <CardDescription className="text-blue-100 line-clamp-2">
                    {subscriptionType.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="text-4xl font-extrabold mb-2 text-blue-900">
                        {formatPrice(subscriptionType.priceInCents)}
                    </div>
                    <div className="text-sm text-blue-600">
                        for {formatDuration(subscriptionType.durationInSeconds)}
                    </div>
                </div>
                <ul className="mt-4 space-y-2">
                    <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 truncate">
                            Exclusive content
                        </span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 truncate">
                            Ad-free experience
                        </span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 truncate">
                            Unlimited articles
                        </span>
                    </li>
                </ul>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-200 py-6">
                <Button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                    asChild
                >
                    <Link href={`/subscribe/${subscriptionType.slug}`}>
                        Subscribe Now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
