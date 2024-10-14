import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubscribeButton() {
  return (
    <Button
      asChild
      className="bg-orange-400 hover:bg-orange-300 text-black font-bold"
    >
      <Link href={"/subscribe"}>Subscribe Now!</Link>
    </Button>
  );
}
