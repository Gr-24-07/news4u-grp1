"use server";

import { authOptions } from "@/lib/api/authOptions";
import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

const UpdateUserRoleSchema = z.object({
    id: z.string(),
    role: z.nativeEnum(Role),
});

export default async function updateUserRole(id: string, role: Role) {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
        throw new Error("Not authenticated");
    }
    const res = await UpdateUserRoleSchema.safeParseAsync({
        id: id,
        role: role,
    });

    if (!res.success) {
        return {
            success: false,
        };
    }

    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: res.data.role,
        },
    });
}
