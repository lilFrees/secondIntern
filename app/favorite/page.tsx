"use client";

import ProductCard from "@/app/_features/product/components/ProductCard";
import { Button, Spinner } from "@chakra-ui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import EmptyState from "../_shared/components/EmptyState";
import useWishlist from "../_features/favorites/hooks/useWishlist";
import UnauthorizedState from "../_shared/components/UnauthorizedState";
import useCart from "../_features/cart/hooks/useCart";
import { useUser } from "../_features/auth/hooks/userStore";
import { clearWishlist } from "../_features/favorites/services/wishlist-service";

function Page() {
  const { user } = useUser();

  const { wishlist, wishlistIdArray, loading } = useWishlist();
  const { cartIdArray } = useCart();

  if (!user) {
    return <UnauthorizedState text="Please login to see your wishlist" />;
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner colorScheme="green" />
      </div>
    );
  }

  if (wishlistIdArray.length === 0 && !loading) {
    return <EmptyState text="You have no favorites yet" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Favorites</h2>
        <Button
          leftIcon={<FaRegCircleXmark />}
          variant="ghost"
          onClick={clearWishlist}
        >
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,320px)] gap-5 py-5">
        {wishlist.map((prod, i) => (
          <ProductCard
            prod={prod}
            key={i}
            isInCart={cartIdArray.includes(prod.id)}
            isInWishlist={wishlistIdArray.includes(prod.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
