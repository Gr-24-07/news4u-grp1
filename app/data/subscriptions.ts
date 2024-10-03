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

            return {
                name: subType?.name,
                expired: expiredCount,
                active: activeCount,
            };
        })
    );

    return result;
}
