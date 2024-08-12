import { useCallback, useEffect, useState } from "react";
import { IProduct } from "@/app/_interfaces/IProduct";
import { fetchFilteredProducts } from "@/app/_lib/product-service";
import { useFilter } from "../_lib/State";

function useProducts(
  searchQuery?: string,
  category?: string,
  page: number = 1,
) {
  const [products, setProducts] = useState<{
    data: IProduct[];
    dataLength: number;
    brandList: Set<string>;
  }>({ data: [], dataLength: 0, brandList: new Set() });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { brands, priceRange } = useFilter();

  const debouncedFetchProducts = useCallback(
    debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchFilteredProducts({
          query: searchQuery,
          category,
          priceRange,
          brands,
          page,
        });
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }, 1000),
    [brands, category, priceRange, searchQuery, page],
  );

  useEffect(() => {
    debouncedFetchProducts();

    // Cleanup function to cancel the debounce if the component unmounts
    return () => debouncedFetchProducts.cancel();
  }, [debouncedFetchProducts]);

  return { products, loading, error };
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

export default useProducts;
