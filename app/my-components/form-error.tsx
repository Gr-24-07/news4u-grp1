import { useId } from "react";

export type FormErrorProps = {
    errors: string[] | undefined | null;
};

export default function FormError({ errors }: FormErrorProps) {
    const id = useId();

    if (!errors || !errors.length) {
        return null;
    }

    return (
        <ul className="flex flex-col">
            {errors.map((err) => (
                <li
                    key={`validation-error-${id}-${err}`}
                    className="text-red-600 font-medium text-sm"
                >
                    {err}
                </li>
            ))}
        </ul>
    );
}
