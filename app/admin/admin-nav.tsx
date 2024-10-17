"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav>
            <ul>
                <li>
                    <Link
                        className={cn(
                            "block hover:underline",
                            pathname === "/admin" && "font-semibold"
                        )}
                        href={"/admin"}
                    >
                        Statistics
                    </Link>
                </li>
                <li>
                    <Link
                        className={cn(
                            "block hover:underline",
                            pathname === "/admin/articles" && "font-semibold"
                        )}
                        href={"/admin/articles"}
                    >
                        Articles
                    </Link>
                </li>
                <li>
                    <Link
                        className={cn(
                            "block hover:underline",
                            pathname === "/admin/users" && "font-semibold"
                        )}
                        href={"/admin/users"}
                    >
                        Users
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
