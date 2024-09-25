"use client";

import React from "react";
import Link from "next/link";
import SignUpForm from "../my-components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <SignUpForm />
      </main>
    </div>
  );
}
