import getUsersBasicInfo from "@/app/data/users";
import UsersTable from "./users.table";

export default async function UsersPage() {
    const users = await getUsersBasicInfo();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Users</h1>
            <UsersTable users={users}></UsersTable>
        </div>
    );
}
