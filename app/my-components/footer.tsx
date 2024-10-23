"use client";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/session/sessionManager";

export default function Footer() {
    const { data: session } = useSession();

    const links = [
        { name: "Local", href: "/categories/local" },
        { name: "National", href: "/categories/sweden" },
        { name: "International", href: "/categories/international" },
        { name: "Economy", href: "/categories/economy" },
        { name: "Business", href: "/categories/business" },
        { name: "Sports", href: "/categories/sports" },
        { name: "Entertainment", href: "/categories/entertainment" },
        { name: "Weather", href: "/weather" },
        { name: "Live", href: "/categories/live" },
    ];

    return (
        <div className="bg-gradient-to-l from-orange-100 to-orange-50 p-2">
            <footer className="md:py-5">
                <div className="flex flex-1">
                    <Link
                        className="font-bold italic sm:font-bold md:font-bold text-xl md:text-2xl lg:text-3xl"
                        href="/"
                    >
                        News4U
                    </Link>
                </div>

                {session?.user?.role === "ADMIN" ? (
                    <div className="px-4 h-6 items-center justify-end flex border-b border-slate-500">
                        <Link
                            className="text-muted-foreground hover:text-foreground text-sm"
                            href="/admin"
                        >
                            Admin Dashboard
                        </Link>
                    </div>
                ) : (
                    []
                )}

                <div className="font-bold text-sm hidden md:flex w-full items-center gap-4 mt-5">
                    <div>
                        <ul className="md:flex flex-1 space-x-10 hidden">
                            <li className="flex flex-1 space-x-10">
                                {links.map((link) => (
                                    <Link
                                        className="hover:underline"
                                        key={link.name}
                                        href={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex font-bold my-3 flex-wrap sm:space-y-2">
                    <h3>Follow News4U On: </h3>
                    <ul>
                        <li className="flex items-center gap-4 space-x-4 sm:px-4">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                            >
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                            >
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                            >
                                <Instagram className="h-6 w-6" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                                prefetch={false}
                            >
                                <Youtube className="h-6 w-6" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <p className="text-sm mt-5 mb-1">
                    Copyright 2024 News4U. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
