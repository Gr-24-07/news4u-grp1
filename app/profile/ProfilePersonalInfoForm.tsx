"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, "Invalid date format"),
});

type FormData = z.infer<typeof personalInfoSchema>;

interface ProfilePersonalInfoFormProps {
  userId: string;
  initialData: {
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
  };
}

export default function ProfilePersonalInfoForm({
  userId,
  initialData,
}: ProfilePersonalInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      dateOfBirth: initialData.dateOfBirth || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/profile-update-personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Personal information updated successfully",
        });
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.error || "Failed to update personal information",
        });
      }
    } catch (error) {
      console.error("Error updating personal information:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Personal Information
      </h2>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-white">{message.text}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-white"
        >
          First Name
        </label>
        <Input
          id="firstName"
          {...register("firstName")}
          className="mt-1 bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-white"
        >
          Last Name
        </label>
        <Input
          id="lastName"
          {...register("lastName")}
          className="mt-1 bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dateOfBirth"
          className="block text-sm font-medium text-white"
        >
          Date of Birth
        </label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className="mt-1 bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-white"
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-500">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? "Updating..." : "Update Personal Information"}
      </Button>
    </form>
  );
}
