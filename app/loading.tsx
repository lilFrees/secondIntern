import { Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <Spinner
      colorScheme="green"
      size="xl"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}

export default Loader;
