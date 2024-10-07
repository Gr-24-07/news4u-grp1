import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProfileResetPasswordForm from "./ProfileResetPasswordForm";
import ProfileSubscriptionInfo from "./ProfileSubscriptionInfo";
import ProfileNewsletterPreferences from "./ProfileNewsletterPreferences";
import AuthBackground from "../my-components/AuthBackground";
import ProfilePersonalInfoForm from "./ProfilePersonalInfoForm";
import ProfileChangeEmailForm from "./ProfileChangeEmailForm";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const emailChanged = searchParams.emailChanged === "true";
  const error = searchParams.error as string | undefined;

  return (
    <AuthBackground>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="relative">
            <div className="relative flex justify-center">
              <span className="text-3xl font-extrabold mb-10 mt-8 px-2 text-white bg-opacity-100 backdrop-filter backdrop-blur-lg z-10 relative">
                Profile
              </span>
            </div>
          </div>
          {emailChanged && (
            <div className="mb-4 p-4 bg-green-500 text-white rounded-md">
              Your email has been successfully changed.
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
              {error === "invalid_token" && "Invalid or expired token."}
              {error === "invalid_token_data" && "Invalid token data."}
              {error === "verification_failed" && "Email verification failed."}
              {![
                "invalid_token",
                "invalid_token_data",
                "verification_failed",
              ].includes(error) && "An error occurred."}
            </div>
          )}
          <div className="space-y-8">
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
            <ProfileChangeEmailForm />
            <ProfileResetPasswordForm />
            <ProfileSubscriptionInfo subscription={user.subscription} />
            <ProfileNewsletterPreferences
              userId={user.id}
              initialPreference={user.newsletter}
            />
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
