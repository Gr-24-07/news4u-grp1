"use client";

import React from "react";
import SignInForm from "../my-components/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <SignInForm />
      </main>
    </div>
  );
}
