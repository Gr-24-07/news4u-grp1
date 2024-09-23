import prisma from "@/lib/db";
import { NewsSubscriptionCardGradient } from "@/components/news-subscription-card-gradient";

export default async function SubscribePage() {
    const subscriptionTypes = await prisma.subscriptionType.findMany();

    return (
        <div className="container max-w-screen-lg mx-auto">
            <h1 className="text-center text-3xl font-bold">Subscribe</h1>
            <div className="flex justify-center gap-2">
                {subscriptionTypes.map((subscriptionType) => {
                    return (
                        <NewsSubscriptionCardGradient
                            key={subscriptionType.id}
                            subscriptionType={subscriptionType}
                        ></NewsSubscriptionCardGradient>
                    );
                })}
            </div>
        </div>
    );
}
