import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubscribeClientWrapper from "./SubscribeClientWrapper";

export default async function SubscribePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  const subscriptionTypes = await prisma.subscriptionType.findMany();

  if (!subscriptionTypes.length) {
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
  const hasActiveSubscription =
    user.subscription &&
    user.subscription.status === "ACTIVE" &&
    new Date(user.subscription.expiresAt) > now;

  return (
    <div className="container max-w-screen-lg mx-auto space-y-6 mb-6 mt-2">
      <h1 className="text-center text-3xl font-bold">Subscribe</h1>
      {hasActiveSubscription ? (
        <p className="text-center">
          You already have an active subscription. It will expire on{" "}
          {user.subscription?.expiresAt.toLocaleDateString()}.
        </p>
      ) : (
        <SubscribeClientWrapper
          subscriptionTypes={subscriptionTypes}
          userId={user.id}
          isResubscribing={!!user.subscription}
          subscriptionStatus={user.subscription?.status}
        />
      )}
    </div>
  );
}
