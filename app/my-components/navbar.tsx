"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthStatus from "./AuthStatusClient";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import ArticleSearch from "../search/search";
import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import { checkUserSubscription } from "../front-page/checkUserSubscription";
import Image from "next/image";

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

  const { data: session } = useSession(); // Use NextAuth session
  const userId = session?.user?.id;
  const [subscriber, setSubscriber] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (userId) {
        const hasSubscription = await checkUserSubscription(userId);
        setSubscriber(hasSubscription);
      } else {
        setSubscriber(false);
      }
    };
    checkSubscription();
  });

  const closeSheet = () => {
    setOpen(false);
  };

  function handleSearchClick() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className="sticky top-0 z-50 bg-orange-100 ">
      <div className="flex flex-1 pt-3 mr-4 sm:mr-3 justify-end">
        {!subscriber ? (
          <Button className="gap-0.5 mt-2 sm:mt-0 bg-orange-400 hover:bg-orange-500 transition-colors">
            <Link
              className="flex gap-0.5 items-center text-xs"
              href={`/subscribe`}
            >
              Subscribe Now for $9.99/Month
            </Link>
          </Button>
        ) : (
          <small className="italic font-semibold text-white bg-orange-400 px-3 ">
            Welcome!
          </small>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 transition-colors px-4 py-2 gap-2 items-center">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div>
                <Hamburger size={26} toggled={open} toggle={setOpen} />
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="text-lg font-semibold text-foreground mt-4">
                <Link
                  onClick={closeSheet}
                  href="/"
                  className="italic font-bold mx-4"
                >
                  News4U
                </Link>
                <div>
                  <ArticleSearch closeSheet={closeSheet} />
                </div>
                <div className="items-center md:hidden ">
                  <AuthStatus />
                </div>
              </SheetTitle>
              <div onClick={closeSheet} className="flex flex-col gap-2 m-4">
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={`${link.href}-sheet-link`}>
                      <Link
                        className="flex items-center pl-2 border border-slate-200 py-1 rounded text-center hover:bg-slate-200 hover:underline underline-offset-1"
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

          <div className="gap-2 flex items-center ">
            <div className="gap-2 flex">
              <Button size="icon" variant="ghost" onClick={handleSearchClick}>
                <Link href={`/search`}>
                  <Search size={26} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-end md:justify-center lg:justify-center text-center">
          <Link className="" href="/">
            <Image
              src="/new4u.png"
              alt="News4U"
              width={200}
              height={100}
              className="lg:min-h-[10vh]"
            />
          </Link>
        </div>

        <div className="md:flex items-center justify-end hidden">
          <AuthStatus />
        </div>
      </div>

      <nav className="px-4 font-bold hidden md:block border-y border-slate-500">
        <ul className="md:flex justify-center space-x-4 sm:space-x-6 md:space-x-8 py-2 hidden">
          {links.map((link) => (
            <li className="hover:underline" key={link.name}>
              <Link href={link.href} className="text-sm">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
