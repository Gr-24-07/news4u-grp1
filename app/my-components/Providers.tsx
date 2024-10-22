"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { SessionProvider } from "@/lib/context/SessionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextAuthSessionProvider>
  );
}
