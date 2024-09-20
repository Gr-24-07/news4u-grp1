"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Redirect to home page after sign out
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {status === "authenticated" ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
