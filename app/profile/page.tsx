import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import dynamic from "next/dynamic";

import AuthBackground from "../my-components/AuthBackground";
import ProfilePersonalInfoForm from "./ProfilePersonalInfoForm";
import ProfileChangeEmailForm from "./ProfileChangeEmailForm";
import ProfileResetPasswordForm from "./ProfileResetPasswordForm";
import ProfileNewsletterPreferences from "./ProfileNewsletterPreferences";

import { User, ProfilePageProps } from "@/types/user";
import ProfileDeleteAccount from "./ProfileDeleteAccount";

const SubscriptionInfoWrapper = dynamic(
  () => import("./SubscriptionInfoWrapper").then((mod) => mod.default),
  { ssr: false }
) as any;

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProfilePage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const user = (await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  })) as User | null;

  if (!user) {
    throw new Error("User not found");
  }

  const hasActiveSubscription =
    !!user.subscription && new Date(user.subscription.expiresAt) > new Date();

  const error = searchParams.error as string | undefined;

  const props: ProfilePageProps = { user, error };

  return (
    <AuthBackground>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-black my-8">
        <div className="px-6 py-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">
              Profile
            </h1>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Manage your account information and preferences.
            </p>
          </div>

          {props.error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {props.error === "invalid_token" && "Invalid or expired token."}
              {props.error === "invalid_token_data" && "Invalid token data."}
              {props.error === "verification_failed" &&
                "Email verification failed."}
              {![
                "invalid_token",
                "invalid_token_data",
                "verification_failed",
              ].includes(props.error) && "An error occurred."}
            </div>
          )}

          <div className="space-y-8">
            <SubscriptionInfoWrapper
              subscription={user.subscription}
              userId={user.id}
            />
            <ProfileNewsletterPreferences
              userId={user.id}
              initialPreference={user.newsletter}
            />
            <ProfilePersonalInfoForm
              userId={user.id}
              initialData={{
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth
                  ? user.dateOfBirth.toISOString().split("T")[0]
                  : null,
              }}
            />
            <ProfileResetPasswordForm />
            <ProfileChangeEmailForm />
            <ProfileDeleteAccount
              hasActiveSubscription={hasActiveSubscription}
            />
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
