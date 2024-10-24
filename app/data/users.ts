import { authOptions } from "@/lib/api/authOptions";
import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export type UserBasicInfo = Pick<
    User,
    "id" | "email" | "firstName" | "lastName" | "role"
>;

export default async function getUsersBasicInfo(): Promise<UserBasicInfo[]> {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN" && session?.user.role !== "EDITOR") {
        throw new Error("Not authenticated");
    }

    const result = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
        },
    });

    return result;
}
