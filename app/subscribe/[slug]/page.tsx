import prisma from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import PaymentForm from "./payment-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type PageProps = {
    params: {
        slug: string;
    };
};

export default async function Page({ params }: PageProps) {
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
                userId={session.user.id}
                subId={subType.id}
            ></PaymentForm>
        </div>
    );
}
