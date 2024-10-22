"use client";

import { createContext, useContext, useMemo } from "react";
import { useSession as useSessionManager } from "../session/sessionManager";
import { Role } from "@/types/user";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    role: Role;
    name?: string | null;
  };
}

interface SessionContextType {
  session: CustomSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  status: "loading",
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSessionManager();

  const value = useMemo(
    () => ({
      session: session as CustomSession | null,
      status,
    }),
    [session, status]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
