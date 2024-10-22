import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma } from "@prisma/client";
import PaymentForm from "./payment-form";

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function SubscribeSlugPage({ params }: PageProps) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/sign-in");
    }

    const subType = await prisma.subscriptionType.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!subType) {
        notFound();
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { subscription: true },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const now = new Date();
    const isResubscribing =
        user.subscription && user.subscription.expiresAt <= now;

    return (
        <div className="container max-w-screen-lg mx-auto space-y-6 mb-6 mt-2 flex flex-col justify-center items-center">
            <div className="bg-primary/10 p-4 rounded-lg w-full max-w-sm bg-gradient-to-l from-orange-50 to-white border border-orange-300">
                <h3 className="font-semibold text-lg mb-2">
                    Subscription Details
                </h3>
                <p>Plan: {subType.name}</p>
                <p>Price: ${(subType.priceInCents / 100).toFixed(2)}</p>
                <p>Includes: {subType.description}</p>
            </div>
            {isResubscribing && (
                <p className="text-center">
                    You are resubscribing. Your new subscription will start
                    immediately.
                </p>
            )}
            <PaymentForm userId={user.id} subId={subType.id} />
        </div>
    );
}
