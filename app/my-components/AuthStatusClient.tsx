'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthStatus() {
  const { data: session, status } = useSession();
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
      <div className="flex ml-2 justify-end">
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 justify-end">
        <Button asChild>
          <Link href="/sign-up">Register</Link>
        </Button>
      </div>
      <div className="flex ml-2 justify-end">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </>
  );
}