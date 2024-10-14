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

export async function getNewSubscribersData() {
    const subscriptions = await prisma.subscription.findMany({
        include: {
            subscriptionType: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    interface FormattedDataEntry {
        date: string;
        [subscriptionType: string]: number | string;
    }

    const formattedData = subscriptions.reduce((acc, sub) => {
        const date = sub.createdAt.toISOString().split("T")[0];
        const subscriptionName = sub.subscriptionType.name;
        const existingDateEntry = acc.find((entry) => entry.date === date);

        if (existingDateEntry) {
            existingDateEntry[subscriptionName] =
                ((existingDateEntry[subscriptionName] as number) || 0) + 1;
        } else {
            acc.push({
                date,
                [subscriptionName]: 1,
            });
        }

        return acc;
    }, [] as FormattedDataEntry[]);

    console.log(formattedData);

    return formattedData;
}
