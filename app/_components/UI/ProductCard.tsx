import Image from "next/image";
import temp from "@/public/logo.png";
import { FaStar } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import StarRating from "./StarRating";
import { IProduct } from "@/app/_interfaces/IProduct";

function ProductCard({ prod }: { prod: IProduct }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-300 bg-white p-3">
      <div className="relative h-40 w-full">
        <Image
          className="object-contain"
          fill
          src={prod.thumbnail}
          alt="product thumbnail"
        />
      </div>
      <Link
        href={"/products/" + prod.id}
        className="line-clamp-1 font-bold"
        title={prod.title}
      >
        {prod.title}
      </Link>
      <div className="flex items-center gap-2">
        <StarRating rating={prod.rating} />
        <div className="text-xs text-gray-500">
          {prod.reviews.length} {prod.reviews.length > 1 ? "reviews" : "review"}
        </div>
      </div>
      <div className="text-sm">In stock: {prod.stock}</div>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg">$ {prod.price}</div>
        <div className="flex items-center gap-2">
          <IconButton
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme="green"
          >
            <FaRegHeart />
          </IconButton>
          <IconButton
            aria-label="Add to favorites"
            variant="outline"
            colorScheme="green"
          >
            <TiShoppingCart />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
