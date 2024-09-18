"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createArticle, CreateArticleFail } from "../actions/articles";
import FormError from "./form-error";
import { useState } from "react";
import { Category } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { ArticleWithCategoryAuthor } from "../data/articles";
import SubmitButton from "./submit-button";
import { useToast } from "@/hooks/use-toast";

export type ArticleFormProps = {
    categories: Category[];
    article?: ArticleWithCategoryAuthor;
};

export default function ArticleForm({ categories, article }: ArticleFormProps) {
    const [errors, setErrors] = useState<CreateArticleFail["errors"]>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { toast } = useToast();
    async function handleAction(formData: FormData) {
        formData.append("categories", JSON.stringify(selectedCategories));

        const result = await createArticle(formData);

        if (result?.success === false) {
            setErrors(result?.errors);
        } else {
            toast({
                title: "Article successfully created",
                variant: "default",
                className: "bg-secondary",
            });
            setErrors(undefined);
        }
    }

    function toggleCategorySelection(categoryName: string) {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryName)
                ? prevSelected.filter((cat) => cat !== categoryName)
                : [...prevSelected, categoryName]
        );
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
            <div className="space-y-2 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm">
                <h2>Categories</h2>
                {categories.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className="items-top flex space-x-2"
                        >
                            <Checkbox
                                id={category.name}
                                name="categories"
                                value={category.name}
                                onCheckedChange={() =>
                                    toggleCategorySelection(category.name)
                                }
                            ></Checkbox>
                            <Label htmlFor={category.name}>
                                {category.name.charAt(0).toUpperCase() +
                                    category.name.slice(1)}
                            </Label>
                        </div>
                    );
                })}
            </div>
            <div className="space-y-2 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm">
                <h2>Settings</h2>
                <div className="items-top flex space-x-2">
                    <Checkbox id={"paid"} name={"paid"}></Checkbox>
                    <Label htmlFor={"paid"}>Paid Article</Label>
                </div>
            </div>
            <SubmitButton loadingValue="Creating article...">
                Create
            </SubmitButton>
        </form>
    );
}
