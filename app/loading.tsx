import { Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner colorScheme="green" size="xl" />
    </div>
  );
}

export default Loader;
