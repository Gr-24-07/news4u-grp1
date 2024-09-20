import prisma from "@/lib/db";
import { User } from "@prisma/client";

export type UserBasicInfo = Pick<
    User,
    "id" | "email" | "firstName" | "lastName" | "role"
>;

export default async function getUsersBasicInfo(): Promise<UserBasicInfo[]> {
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
