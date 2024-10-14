"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthStatus() {
  const { status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Redirect to home page after sign out
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex ml-2 justify-end space-x-2 gap-2">
        <Button
          asChild
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Link href="/profile">Profile</Link>
        </Button>
        <Button
          onClick={handleSignOut}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex ml-2 justify-end space-x-2">
      <Button asChild>
        <Link href="/sign-up">Register</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
