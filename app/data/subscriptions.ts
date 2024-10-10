import prisma from "@/lib/db";

export async function getSubscriptionCountsByType() {
    const now = new Date();

    const subscriptionTypes = await prisma.subscriptionType.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    const result = await Promise.all(
        subscriptionTypes.map(async (subType) => {
            const expiredCount = await prisma.subscription.count({
                where: {
                    subscriptionTypeId: subType.id,
                    expiresAt: {
                        lt: now,
                    },
                },
            });

            const activeCount = await prisma.subscription.count({
                where: {
                    subscriptionTypeId: subType.id,
                    expiresAt: {
                        gte: now,
                    },
                },
            });

            const autoRenewCount = await prisma.subscription.count({
                where: {
                    subscriptionTypeId: subType.id,
                    autoRenew: true,
                },
            });

            return {
                name: subType?.name,
                total: expiredCount + activeCount,
                expired: expiredCount,
                active: activeCount,
                autoRenew: autoRenewCount,
            };
        })
    );

    return result;
}

export async function getNewSubscribersPerDay() {
    const result = await prisma.subscription.groupBy({
        by: ["createdAt", "subscriptionTypeId"], // Group by date and subscription type
        _count: {
            id: true, // Count new subscriptions
        },
        orderBy: {
            createdAt: "asc", // Order by date
        },
    });

    // Map the result to return data in the desired format
    return result.map((entry) => ({
        date: entry.createdAt.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        subscriptionTypeId: entry.subscriptionTypeId,
        newSubscribers: entry._count.id,
    }));
}
