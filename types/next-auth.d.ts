import { Role } from "./user";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      name?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    role: Role;
    name?: string | null;
  }
}
