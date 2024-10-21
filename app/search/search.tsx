"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export default function ArticleSearch({
  closeSheet,
}: {
  closeSheet: () => void;
}) {
  // const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-1 gap1 items-center m-4">
      <div className="flex flex-1 m-4">
        <form
          className="flex flex-1 items-center"
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSearch(searchTerm);
            closeSheet();
          }}
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
            placeholder="Search news, articles, and more..."
            className="border border-zinc-300 flex rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none min-w-9.5">
            <Search className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
