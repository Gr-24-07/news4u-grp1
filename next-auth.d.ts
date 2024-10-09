import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "USER" | "EDITOR" | "ADMIN";
    // Add any other custom properties here
  }

  interface Session {
    user: User & {
      id: string;
      role: "USER" | "EDITOR" | "ADMIN";
      // Add any other custom properties here
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "EDITOR" | "ADMIN";
    // Add any other custom properties here
  }
}
