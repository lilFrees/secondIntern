"use client";

import { IProduct } from "@/app/_interfaces/IProduct";
import ProductCard from "@/app/_components/UI/ProductCard";
import { fetchFilteredProducts } from "@/app/_lib/product-service";
import { useFilter } from "@/app/_lib/search-filters";
import { useCallback, useEffect, useState } from "react";

function SearchProducts({
  searchQuery,
  category,
}: {
  searchQuery?: string;
  category?: string;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { brands, priceRange } = useFilter();

  const debouncedFetchProducts = useCallback(
    debounce(async () => {
      const fetchedProducts = await fetchFilteredProducts({
        query: searchQuery,
        category,
        priceRange,
        brands,
      });

      setProducts(fetchedProducts);
    }, 1000),
    [brands, category, priceRange, searchQuery],
  );

  useEffect(() => {
    debouncedFetchProducts();

    // Cleanup function to cancel the debounce if the component unmounts
    return () => debouncedFetchProducts.cancel();
  }, [debouncedFetchProducts]);

  if (products.length === 0) {
    return (
      <div className="flex-grow basis-[70%] py-5">
        <div className="w-full text-center text-3xl">
          No products were found
        </div>
      </div>
    );
  }

  return (
    <div className="grid flex-grow basis-[70%] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,320px)] gap-5 py-5">
      {products.map((prod, i) => (
        <ProductCard prod={prod} key={i} />
      ))}
    </div>
  );
}

function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return debounced;
}

export default SearchProducts;
