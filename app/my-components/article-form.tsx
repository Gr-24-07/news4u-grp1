"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createArticle, CreateArticleFail } from "../actions/articles";
import FormError from "./form-error";
import { useState } from "react";

export default function ArticleForm() {
    const [errors, setErrors] = useState<CreateArticleFail["errors"]>();

    async function handleAction(formData: FormData) {
        const result = await createArticle(formData);

        if (!result?.success) {
            setErrors(result?.errors);
        } else {
            setErrors(undefined);
        }
        console.log(result);
    }

    return (
        <form action={handleAction} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="headline">Headline</Label>
                <Input type="text" name="headline"></Input>
                <FormError errors={errors?.headline?._errors}></FormError>
            </div>
            <div>
                <Label htmlFor="image">Image</Label>
                <Input type="text" name="image"></Input>
                <FormError errors={errors?.image?._errors}></FormError>
            </div>
            <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea rows={3} name="summary"></Textarea>
                <FormError errors={errors?.summary?._errors}></FormError>
            </div>
            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea rows={10} name="content"></Textarea>
                <FormError errors={errors?.content?._errors}></FormError>
            </div>
            <Button>Create</Button>
        </form>
    );
}
