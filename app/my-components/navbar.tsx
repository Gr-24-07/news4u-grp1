"use client";

import Link from "next/link";
import { ArrowRight, Menu, Search } from "lucide-react";
import { HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthStatus from "./AuthStatusClient";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const [open, setOpen] = React.useState(false);

  const subscribePath = usePathname();

  const closeSheet = () => {
    setOpen(false);
  };

  function handleSearchClick() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className="sticky top-0 z-50 overflow-hidden bg-blue-100">
      {subscribePath !== "/subscribe" ? (
        <div>
          <div className="h-16 bg-orange-400 flex items-center space-x-5 px-4 text-xs font-medium justify-between">
            <div className="sm:flex hidden">October Offer!</div>
            <div className="flex gap-0.5 items-center">
              25% Off
              <HandCoins />
            </div>
            <Button variant="ghost" className="gap-0.5">
              <Link
                className="flex gap-0.5 items-center sm:items-center"
                href={`/subscribe`}
              >
                Subscribe Now!
                <ArrowRight className="w-3 h-3" />
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-3 transition-colors px-4 gap-2">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="flex gap-2" size="icon" variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="text-lg font-semibold text-foreground mt-4">
                <Link onClick={closeSheet} className="font-bold my-5" href="/">
                  News4U
                </Link>
                <div className="flex flex-1 gap-1 items-center mb-4">
                  <div className="flex flex-1 mt-4">
                    <Input
                      ref={inputRef}
                      type="text"
                      // onSubmit={}
                      className="border border-zinc-300 flex rounded-r-none"
                      placeholder="Search news, articles, and more..."
                    />
                    <Button size="icon" className="rounded-l-none min-w-9.5">
                      <Search onClick={closeSheet} className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </SheetTitle>
              <div onClick={closeSheet} className="flex flex-col gap-2 mb-2 ">
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={`${link.href}-sheet-link`}>
                      <Link
                        className="flex items-center border border-slate-50 py-1 rounded text-center hover:bg-slate-100"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>

          <div className="gap-2 flex items-center">
            <div className="gap-2 flex">
              <Button size="icon" variant="ghost" onClick={handleSearchClick}>
                <Link href={`/search`}>
                  <Search size="icon " className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center text-center">
          <Link className="font-bold text-3xl md:text-4xl my-5" href="/">
            News4U
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:flex">
            <AuthStatus />
          </div>
        </div>
      </div>

      <nav className="px-4 text-blue-500 items-center bg-slate-100 sm:flex hidden justify-center border-y border-slate-500">
        <div>
          <ul className="flex flex-1 space-x-10 items-center p-3 justify-center">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
