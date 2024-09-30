import { Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";
import CategoriesList from "./_features/categories/components/CategoriesList";
import ProductList from "./_features/product/components/ProductList";
import HeroCarousel from "./_shared/components/HeroCarousel";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />

      <h2 className="my-10 text-3xl font-semibold">Fresh arrivals</h2>

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

      <h2 className="my-10 text-3xl font-semibold">Best Categories to Shop</h2>
      <CategoriesList preview={true} />
      <Link href="/catalog" className="mx-auto my-10">
        <Button
          colorScheme="green"
          className="rounded-lg font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          View all categories
        </Button>
      </Link>
    </div>
  );
}
