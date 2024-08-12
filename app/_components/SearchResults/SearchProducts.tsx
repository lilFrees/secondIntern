"use client";

import { useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import ProductCard from "@/app/_components/UI/ProductCard";
import useProducts from "@/app/_hooks/useProducts";
import useCart from "@/app/_hooks/useCart";
import useWishlist from "@/app/_hooks/useWishlist";

function SearchProducts({
  searchQuery,
  category,
}: {
  searchQuery?: string;
  category?: string;
}) {
  const [page, setPage] = useState<number>(1);
  const { cartIdArray } = useCart();
  const { wishlistIdArray } = useWishlist();

  const { products, loading, error } = useProducts(searchQuery, category, page);

  if (loading) {
    return (
      <div className="flex-grow basis-[70%] py-5">
        <div className="w-full text-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow basis-[70%] py-5">
        <div className="w-full text-center text-3xl">{error}</div>
      </div>
    );
  }

  if (products.data.length === 0) {
    return (
      <div className="flex-grow basis-[70%] py-5">
        <div className="w-full text-center text-3xl">
          No products were found
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-grow basis-[70%] flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] grid-rows-[repeat(auto-fill,300px)] gap-5 py-5">
        {products.data.map((prod, i) => (
          <ProductCard
            prod={prod}
            key={i}
            isInCart={cartIdArray.includes(prod.id)}
            isInWishlist={wishlistIdArray.includes(prod.id)}
          />
        ))}
      </div>
      {products.data.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from(
            { length: Math.ceil(products.dataLength / 12) },
            (_, i) => (
              <Button
                key={i}
                onClick={() => setPage(i + 1)}
                backgroundColor={page === i + 1 ? "green.700" : "gray.200"}
                color={page === i + 1 ? "white" : "black"}
              >
                {i + 1}
              </Button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default SearchProducts;
