"use client";
import React from "react";
import SignInForm from "../my-components/SignInForm";
import AuthBackground from "../my-components/AuthBackground";

export default function SignInPage() {
  return (
    <AuthBackground>
      <SignInForm />
    </AuthBackground>
  );
}
