"use client";

import React from "react";
import SignInForm from "../my-components/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Sign In</h1>
        <SignInForm />
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>

        <p className="mt-4">
          Forgot password?{" "}
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Click here
          </Link>
        </p>
      </main>
    </div>
  );
}
