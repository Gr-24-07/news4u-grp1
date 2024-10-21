"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthBackground from "../my-components/AuthBackground";
import { Button } from "@/components/ui/button";

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
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-black">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            {!isSuccess ? (
              <>
                <div className="border-b border-gray-400 pb-1 mb-8 mt-1">
                  <h2 className="text-center text-3xl font-extrabold text-black mb-2">
                    Forgot your password?
                  </h2>
                </div>
                <p className="text-center text-sm text-gray-600 mb-6">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
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
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full flex justify-center"
                    >
                      Send reset link
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-black">{message}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Please check your email for further instructions.
                </p>
              </div>
            )}
            {message && !isSuccess && (
              <p className="mt-2 text-sm text-red-600">{message}</p>
            )}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
