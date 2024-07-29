"use client";

import ProductCard from "@/app/_components/UI/ProductCard";
import { Button } from "@chakra-ui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import EmptyState from "../_components/UI/EmptyState";
import { useFavorite } from "../_context/FavoriteContext";
import { clearAllFavorites } from "../_lib/shopping-cart";

function Page() {
  const { favorites } = useFavorite();

  if (favorites.length === 0) {
    return <EmptyState text="You have no favorites yet" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Favorites</h2>
        <Button
          leftIcon={<FaRegCircleXmark />}
          variant="ghost"
          onClick={clearAllFavorites}
        >
          Clear
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,320px)] gap-5 py-5">
        {favorites.map((prod, i) => (
          <ProductCard prod={prod} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Page;
