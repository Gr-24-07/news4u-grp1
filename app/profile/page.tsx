import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import ProfileResetPasswordForm from "./ProfileResetPasswordForm";
import ProfileSubscriptionInfo from "./ProfileSubscriptionInfo";
import ProfileNewsletterPreferences from "./ProfileNewsletterPreferences";
import AuthBackground from "../my-components/AuthBackground";
import ProfilePersonalInfoForm from "./ProfilePersonalInfoForm";

export default async function ProfilePage() {
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

  return (
    <AuthBackground>
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-600 text-2xl font-extrabold mb-8 mt-8" />
            </div>
            <div className="relative flex justify-center">
              <span className="text-3xl font-extrabold mb-10 mt-8 px-2 text-white bg-opacity-100 backdrop-filter backdrop-blur-lg z-10 relative">
                Your Profile
              </span>
            </div>
          </div>
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

            <ProfileResetPasswordForm />
            <ProfileSubscriptionInfo subscription={user.subscription} />
            <ProfileNewsletterPreferences
              userId={user.id}
              currentPreference={user.newsletter}
            />
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
