"use client";

import React from "react";
import SignUpForm from "../my-components/SignUpForm";
import AuthBackground from "../my-components/AuthBackground";

export default function SignUpPage() {
  return (
    <AuthBackground>
      <SignUpForm />
    </AuthBackground>
  );
}
