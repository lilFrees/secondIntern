"use client";

import { getProducts } from "@/app/_lib/product-service";
import ProductCard from "@/app/_components/UI/ProductCard";
import { getCartItems } from "@/app/_lib/cart-service";
import useCart from "@/app/_hooks/useCart";
import { useEffect, useState } from "react";
import { IProduct } from "@/app/_interfaces/IProduct";
import useWishlist from "@/app/_hooks/useWishlist";
import { Button, Spinner } from "@chakra-ui/react";

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(1);
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const productsData = await getProducts(limit);
      setProducts((prev) => [...prev, ...productsData]);
      setIsLoading(false);
    }

    fetchProducts();
  }, [limit]);

  const { cartIdArray } = useCart();
  const { wishlist, wishlistIdArray } = useWishlist();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,320px)] gap-5 py-5">
        {products.map((prod, i) => (
          <ProductCard
            prod={prod}
            key={i}
            isInCart={cartIdArray.includes(prod.id)}
            isInWishlist={wishlistIdArray.includes(prod.id)}
          />
        ))}
      </div>
      <Button onClick={() => setLimit((prev) => prev + 1)}>See more...</Button>
    </div>
  );
}

export default ProductList;
