import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import empty from "@/public/empty.png";

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-5">
      <div className="relative size-64">
        <Image
          src={empty}
          alt="Empty State"
          fill
          className="block h-full w-full object-contain"
        />
      </div>
      <div className="py-5 text-lg text-gray-500">{text}</div>
      <Link href="/products">
        <Button colorScheme="green">Shop now</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
