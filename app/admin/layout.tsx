import AdminNav from "./admin-nav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex gap-6">
            <aside className="w-64 h-56 p-6 mt-20 border border-border rounded-md">
                <h2 className="font-bold text-lg">Admin Pages:</h2>
                <AdminNav />
            </aside>
            {children}
        </div>
    );
}
