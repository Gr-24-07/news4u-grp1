import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/validators/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

type FormData = z.infer<typeof registerSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      newsletter: false,
    },
    mode: "onChange",
  });

  async function onSubmit(values: FormData) {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.success) {
        router.push("/sign-up/success");
      } else {
        setSubmitError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden w-full max-w-md">
      <div className="px-6 py-8">
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Create your account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    First Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your first name"
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    Last Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your last name"
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
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
                      required
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
                      placeholder="********"
                      required
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      required
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-white">
                    Date of Birth (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value || ""}
                      className="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
                    />
                  </FormControl>
                  <FormMessage className="mt-2 text-sm text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-sm font-medium text-white">
                      Newsletter Preferences
                    </FormLabel>
                    <FormControl>
                      <div className="mr-4">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormDescription className="mt-1 text-sm text-gray-300">
                    Receive updates about our latest news and events.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-white bg-opacity-100 backdrop-filter backdrop-blur-lg z-10 relative">
                Already have an account?
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/sign-in"
              className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-md shadow-sm bg-white bg-opacity-10 text-sm font-medium text-white hover:bg-opacity-20 transition duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/forgot-password"
              className="w-full inline-flex justify-center py-2 px-4 border border-white border-opacity-20 rounded-md shadow-sm bg-white bg-opacity-10 text-sm font-medium text-white hover:bg-opacity-20 transition duration-300"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
