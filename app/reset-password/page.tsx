"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthBackground from "../my-components/AuthBackground";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/sign-in");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successful. You can now log in with your new password.");
        setIsSuccess(true);
      } else {
        setMessage(result.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            {!isSuccess ? (
              <>
                <h2 className="text-center text-3xl font-extrabold text-white mb-6">
                  Reset your password
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium text-white">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium text-white">
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reset Password
                    </Button>
                  </form>
                </Form>
                {message && <p className="mt-2 text-sm text-red-400">{message}</p>}
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm font-medium text-white">{message}</p>
                <p className="mt-2 text-sm text-gray-300">
                  Redirecting to sign-in page...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}