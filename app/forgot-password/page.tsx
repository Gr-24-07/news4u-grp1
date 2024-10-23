"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthBackground from "../my-components/AuthBackground";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("If an account exists, a reset email has been sent.");
        setIsSuccess(true);
      } else {
        setMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <AuthBackground>
      <main className="flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center text-black bg-white rounded-lg shadow-md border border-black my-8 min-h-[300px]">
        {!isSuccess ? (
          <>
            <h1 className="text-4xl font-bold mb-4">Forgot your password?</h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <form
              className="w-full space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-left"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm bg-white text-black"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full flex justify-center">
                Send reset link
              </Button>
            </form>
          </>
        ) : (
          <>
            <CheckCircle className="mb-6 h-16 w-16 text-green-600" />
            <p className="text-xl font-medium text-black mb-2">{message}</p>
            <p className="text-sm text-gray-600">
              Please check your email for further instructions.
            </p>
          </>
        )}
        {message && !isSuccess && (
          <p className="mt-2 text-sm text-red-600">{message}</p>
        )}
      </main>
    </AuthBackground>
  );
}
