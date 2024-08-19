"use client";

import { getProducts } from "@/app/_lib/product-service";
import ProductCard from "@/app/_components/UI/ProductCard";
import { getCartItems } from "@/app/_lib/cart-service";
import useCart from "@/app/_hooks/useCart";
import { useEffect, useState } from "react";
import { IProduct } from "@/app/_interfaces/IProduct";
import useWishlist from "@/app/_hooks/useWishlist";
import { Button, Skeleton, Spinner } from "@chakra-ui/react";
const limit = 20;

function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const productsData = await getProducts(page, limit);
      setProducts((prev) => {
        if (
          prev.filter((prod) => prod.id === productsData[0].id).length === 0
        ) {
          return [...prev, ...productsData];
        } else {
          return prev;
        }
      });
      setMounted(true);
      setIsLoading(false);
    }

    fetchProducts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const { cartIdArray } = useCart();
  const { wishlist, wishlistIdArray } = useWishlist();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="grid auto-rows-[320px] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 py-5">
        {!mounted && (
          <>
            {new Array(20).fill(0).map((_, i) => (
              <Skeleton w="100%" h="100%" key={i} rounded="10px">
                number {i}
              </Skeleton>
            ))}
          </>
        )}

        {mounted &&
          products.map((prod, i) => (
            <ProductCard
              prod={prod}
              key={i}
              isInCart={cartIdArray.includes(prod.id)}
              isInWishlist={wishlistIdArray.includes(prod.id)}
            />
          ))}
      </div>
      {mounted ? (
        isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Button onClick={handleLoadMore}>See more...</Button>
        )
      ) : null}
    </div>
  );
}

export default ProductList;
