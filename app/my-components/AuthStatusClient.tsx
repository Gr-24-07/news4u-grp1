"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex flex-row space-x-2 justify-center">
        <Button
          asChild
          className="p-3 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium"
        >
          <Link href="/profile">Profile</Link>
        </Button>
        <Button
          onClick={handleSignOut}
          className="py-1 px-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-row space-x-2 justify-center">
      <Button
        asChild
        className="py-1 px-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium"
      >
        <Link href="/sign-up">Register</Link>
      </Button>
      <Button
        asChild
        className="py-1 px-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium"
      >
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
