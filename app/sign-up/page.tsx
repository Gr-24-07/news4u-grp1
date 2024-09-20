"use client";

import React from "react";
import Link from "next/link";
import SignUpForm from "../my-components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <SignUpForm />
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="sign-in" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </main>
    </div>
  );
}
