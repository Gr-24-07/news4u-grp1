"use server";

import prisma from "@/lib/db";
import { Role } from "@prisma/client";

export default async function updateUserRole(id: string, role: Role) {
    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            role: role,
        },
    });
}
