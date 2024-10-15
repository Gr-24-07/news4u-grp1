import AdminNav from "./admin-nav";
import DropdownAdminNav from "./dropdown-admin-nav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 my-0 lg:my-6 ">
            <nav className="w-1/6 px-6 hidden lg:block">
                <AdminNav />
            </nav>
            <DropdownAdminNav></DropdownAdminNav>
            <div className="flex-1 max-w-screen-lg px-6">{children}</div>
        </div>
    );
}
