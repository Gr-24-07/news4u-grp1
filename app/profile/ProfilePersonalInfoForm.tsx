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
    initialData,
}: ProfilePersonalInfoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    // Format the date to YYYY-MM-DD for the input field
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: initialData.firstName || "",
            lastName: initialData.lastName || "",
            dateOfBirth: formatDate(initialData.dateOfBirth),
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch(
                "/api/user/profile-update-personal-info",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: "Personal information updated successfully",
                });
            } else {
                const errorData = await response.json();
                setMessage({
                    type: "error",
                    text:
                        errorData.error ||
                        "Failed to update personal information",
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black bg-white border border-black p-6 rounded-md"
        >
            <div className="border-b border-gray-400 pb-1 mb-8 mt-1">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Personal Information
                </h2>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-md ${
                        message.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    <p>{message.text}</p>
                </div>
            )}

            <div>
                <label
                    htmlFor="firstName"
                    className="block text-sm font-medium"
                >
                    First Name
                </label>
                <Input
                    id="firstName"
                    {...register("firstName")}
                    className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
                />
                {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                    Last Name
                </label>
                <Input
                    id="lastName"
                    {...register("lastName")}
                    className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
                />
                {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium"
                >
                    Date of Birth
                </label>
                <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                    className="mt-1 bg-white border border-gray-300 focus:ring-2 focus:ring-black"
                />
                {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.dateOfBirth.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center"
            >
                {isSubmitting ? "Updating..." : "Update Personal Information"}
            </Button>
        </form>
    );
}
