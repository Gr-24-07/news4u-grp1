import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        if (
          result.error === "No user found with this email" ||
          result.error === "Invalid password"
        ) {
          setError(
            "Invalid email or password. Please try again or sign up if you don't have an account."
          );
        } else {
          setError(result.error);
        }
      } else if (result?.ok) {
        window.location.href = "/sign-in/success";
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Sign in to your account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 opacity-" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white"></span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/sign-up"
              className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-md shadow-sm bg-white bg-opacity-10 text-sm font-medium text-white hover:bg-opacity-20 transition duration-300"
            >
              Register
            </Link>
            <Link
              href="/forgot-password"
              className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-md shadow-sm bg-white bg-opacity-10 text-sm font-medium text-white hover:bg-opacity-20 transition duration-300"
            >
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
