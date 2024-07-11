import { Suspense } from "react";
import ProductList from "./_components/Product/ProductList";
import { Spinner } from "@chakra-ui/react";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <h2 className="mt-10 text-xl font-semibold">Fresh arrivals</h2>

      <Suspense
        fallback={
          <Spinner
            colorScheme="green"
            size="xl"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        }
      >
        <ProductList />
      </Suspense>
    </div>
  );
}
