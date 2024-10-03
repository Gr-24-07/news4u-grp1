import { getSubscriptionCountsByType } from "../data/subscriptions";

export default async function AdminPage() {
    const subStats = await getSubscriptionCountsByType();

    return (
        <div className="container max-w-screen-lg space-y-4">
            <h1 className="text-center text-3xl font-bold">Dashboard</h1>
            <div className="flex gap-4">
                {subStats.map((subTypeStats) => {
                    return (
                        <div
                            key={subTypeStats.name}
                            className="border-2 border-slate-300 p-4 rounded-lg flex-grow"
                        >
                            <h1 className="font-bold text-lg">
                                {subTypeStats.name}
                            </h1>
                            <p>Active: {subTypeStats.active}</p>
                            <p>Expired: {subTypeStats.expired}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
