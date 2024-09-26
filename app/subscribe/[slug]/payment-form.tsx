"use client";

import {
    CreateSubFailValidate,
    createSubscription,
} from "@/app/actions/subscriptions";
import FormError from "@/app/my-components/form-error";
import SubmitButton from "@/app/my-components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useState } from "react";

type PaymentFormProps = {
    userId: string;
    subId: string;
};

export default function PaymentForm({ userId, subId }: PaymentFormProps) {
    const [errors, setErrors] = useState<CreateSubFailValidate["errors"]>();
    const [dbError, setDbError] = useState<string>();
    const [cardNumber, setCardNumber] = useState("");
    const [rawCardNumber, setRawCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        // Remove non-digit characters
        const value = e.target.value.replace(/\D/g, "");

        // add space every 4 characters
        const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(formattedValue);
        setRawCardNumber(value);
    }

    function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        if (value.length === 2 && expiration.length === 1) {
            value += "/";
        }

        setExpiration(value);
    }

    return (
        <form
            action={async (formData) => {
                const result = await createSubscription(formData);
                if (result?.error === "validation") {
                    setDbError(undefined);
                    setErrors(result?.errors);
                } else if (result?.error === "database") {
                    setErrors(undefined);
                    setDbError(result?.errorMessage);
                } else {
                    redirect("/");
                }
            }}
            className="flex flex-col gap-4 w-full max-w-sm border border-1 rounded-lg p-6"
        >
            <div>
                <Label htmlFor="card">Cardnumber</Label>
                <Input
                    id="card"
                    type="text"
                    value={cardNumber}
                    onChange={handleChange}
                    maxLength={19}
                    placeholder="**** **** **** ****"
                ></Input>

                {/* This is the hidden raw value you can use for form submission */}
                <input type="hidden" name="cardnumber" value={rawCardNumber} />
                <FormError errors={errors?.cardnumber?._errors}></FormError>
            </div>
            <div className="flex gap-2">
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="subId" value={subId} />
                <div>
                    <Label htmlFor="date">Expiration date</Label>
                    <Input
                        type="text"
                        name="date"
                        id="date"
                        placeholder="MM/YY"
                        value={expiration}
                        onChange={handleDate}
                        maxLength={5}
                    ></Input>

                    <FormError errors={errors?.date?._errors}></FormError>
                </div>
                <div>
                    <Label htmlFor="cvc">CVC/CVV</Label>
                    <Input name="cvc" id="cvc" maxLength={3}></Input>

                    <FormError errors={errors?.cvc?._errors}></FormError>
                </div>
            </div>
            <div className="flex flex-col">
                <SubmitButton>Purchase</SubmitButton>
                <FormError errors={[dbError ?? ""]}></FormError>
            </div>
        </form>
    );
}
