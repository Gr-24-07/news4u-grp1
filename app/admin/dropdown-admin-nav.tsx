"use client";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import AdminNav from "./admin-nav";
import { cn } from "@/lib/utils";

export default function DropdownAdminNav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full px-6 block lg:hidden border-b py-2">
            <h2
                onClick={() => {
                    setOpen(!open);
                }}
                className="font-bold text-lg flex flex-row items-center hover:underline hover:cursor-pointer"
            >
                <CaretRightIcon
                    className={cn(
                        "size-6 transition-transform duration-300",
                        open && "rotate-90"
                    )}
                ></CaretRightIcon>
                Menu
            </h2>
            {open && <AdminNav></AdminNav>}
        </nav>
    );
}
