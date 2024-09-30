import { Button } from "@chakra-ui/react";
import Link from "next/link";

function UnauthorizedState({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center gap-10 text-center">
      <h1 className="text-2xl font-semibold">
        {!text ? "Ooops. You are not logged in 😔" : "Ooops 😔"}
      </h1>
      {text && <p className="text-lg">{text}</p>}
      <Link href="/login">
        <Button colorScheme="green" size="sm">
          Login now
        </Button>
      </Link>
    </div>
  );
}

export default UnauthorizedState;
