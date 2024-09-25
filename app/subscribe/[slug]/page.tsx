import prisma from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";

export default async function Page({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const subType = await prisma.subscriptionType.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!subType) {
        notFound();
    }
    return (
        <div className="container max-w-screen-lg mx-auto space-y-6 mb-6 mt-2 flex flex-col justify-center items-center">
            <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                    Subscription Details
                </h3>
                <p>Plan: {subType.name}</p>
                <p>Price: {formatPrice(subType.priceInCents)}</p>
                <p>
                    Includes: Unlimited articles, Exclusive content, Ad-free
                    experience
                </p>
            </div>
            <PaymentForm
                //TODO Replace with real user
                userId={"cm16g8qds000011a22psj5pvs"}
                subId={subType.id}
            ></PaymentForm>
        </div>
    );
}
