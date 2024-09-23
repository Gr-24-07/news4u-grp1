"use client";

import updateUserRole from "@/app/actions/user";
import { UserBasicInfo } from "@/app/data/users";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Role } from "@prisma/client";
import { useState } from "react";

export default function UserTableRow({ user }: { user: UserBasicInfo }) {
    const [userRole, setUserRole] = useState(user.role);

    return (
        <TableRow>
            <TableCell>{user.email}</TableCell>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>
                <Select
                    onValueChange={async (value) => {
                        setUserRole(value as Role);
                        await updateUserRole(user.id, value as Role);
                        toast({
                            title: `Role updated`,
                            description: `Set role of ${user.email} to ${value}`,
                            className: "bg-secondary",
                        });
                    }}
                    value={userRole}
                >
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Role.USER}>{Role.USER}</SelectItem>
                        <SelectItem value={Role.EDITOR}>
                            {Role.EDITOR}
                        </SelectItem>
                        <SelectItem value={Role.ADMIN}>{Role.ADMIN}</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
        </TableRow>
    );
}
