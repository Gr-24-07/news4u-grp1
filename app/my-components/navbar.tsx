import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const isAdmin = true;

  const links = [
    { name: "Local", href: "/" },
    { name: "National", href: "/sweden" },
    { name: "International", href: "/international" },
    { name: "Economy", href: "/economy" },
    { name: "Business", href: "/business" },
    { name: "Sports", href: "/sports" },
    { name: "Live", href: "/live" },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <div>
          <Button asChild size="icon" variant="ghost">
            <Link href="/">
              <Menu />
            </Link>
          </Button>
        </div>

        <div className="flex-1">
          <Button asChild size="icon" variant="ghost">
            <Link href="/">
              <Search />
            </Link>
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Link className="font-bold text-3xl my-5" href="/">
            News4U
          </Link>
        </div>

        <div className="flex flex-1 justify-end">
          <Button>
            <Link className="" href="/">
              Register
            </Link>
          </Button>
        </div>

        <div className="flex ml-2 justify-end">
          <Button>
            <Link className="" href="/">
              Sign In
            </Link>
          </Button>
        </div>
      </div>

      <nav className="text-blue-500 flex items-center bg-slate-200">
        <div className="flex w-full items-center gap-4">
          <div>
            <ul className="flex flex-1 space-x-10 items-center p-3 justify-center">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex ml-auto">
            <ul className="flex flex-1 items-center justify-between">
              {isAdmin && (
                <li>
                  <Button asChild variant="secondary">
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
