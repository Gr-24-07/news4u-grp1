import { UserBasicInfo } from "@/app/data/users";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import UserTableRow from "./user-table-row";

export default function UsersTable({ users }: { users: UserBasicInfo[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => {
                    return (
                        <UserTableRow key={user.id} user={user}></UserTableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
