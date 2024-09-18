import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProp = ButtonProps & {
    loadingValue?: string;
};

export default function SubmitButton({
    loadingValue = "Loading...",
    children,
    ...props
}: SubmitButtonProp) {
    const { pending } = useFormStatus();
    return <Button {...props}>{pending ? loadingValue : children}</Button>;
}
