import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "Local", href: "/" },
    { name: "National", href: "/sweden" },
    { name: "International", href: "/international" },
    { name: "Economy", href: "/economy" },
    { name: "Business", href: "/business" },
    { name: "Sports", href: "/sports" },
  ];

  return (
    <div className="container mx-auto ">
      <footer className="md:py-12">
        <div className="flex flex-1">
          <Link className="font-bold text-3xl my-5" href="/">
            News4U
          </Link>
        </div>

        <div className="flex w-full items-center gap-4">
          <div>
            <ul className="text-sky-500 flex flex-1 space-x-10">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex font-bold my-3">
          <h3>Follow News4U On: </h3>
          <ul>
            <li className="flex items-center gap-4 space-x-4 px-4">
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

        <p>Copyright 2024 News4U. All rights reserved.</p>
      </footer>
    </div>
  );
}
