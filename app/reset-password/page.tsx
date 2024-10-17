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
import { CheckCircle } from "lucide-react";

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
        setMessage(
          "Password reset successful. You can now log in with your new password."
        );
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-black">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            {!isSuccess ? (
              <>
                <h2 className="text-center text-3xl font-extrabold text-black mb-6">
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
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="bg-white border border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              className="bg-white border border-gray-300 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full flex justify-center"
                    >
                      Reset Password
                    </Button>
                  </form>
                </Form>
                {message && (
                  <p className="mt-2 text-sm text-red-600">{message}</p>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center">
                <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                <div className="text-center">
                  <p className="text-sm font-medium text-black">{message}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Redirecting to sign-in page...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}
