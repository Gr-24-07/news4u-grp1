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
                            <div className="grid grid-cols-2">
                                <div className="flex justify-between w-4/5">
                                    <div>Total:</div>
                                    <div>{subTypeStats.total}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Auto-renew:</div>
                                    <div>{subTypeStats.autoRenew}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Active:</div>
                                    <div>{subTypeStats.active}</div>
                                </div>
                                <div className="flex justify-between w-4/5">
                                    <div>Expired:</div>
                                    <div>{subTypeStats.expired}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
