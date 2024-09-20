"use server";

import prisma from "@/lib/db";
import { Role } from "@prisma/client";
import { z } from "zod";

const UpdateUserRoleSchema = z.object({
    id: z.string(),
    role: z.nativeEnum(Role),
});

export default async function updateUserRole(id: string, role: Role) {
    const res = await UpdateUserRoleSchema.safeParseAsync({
        id: id,
        role: role,
    });

    if (!res.success) {
        return;
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
