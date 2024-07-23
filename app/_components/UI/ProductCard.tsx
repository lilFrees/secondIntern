import { IProduct } from "@/app/_interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import StarRating from "./StarRating";

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
          {/* <IconButton
            icon={<FaRegHeart />}
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme="green"
          ></IconButton> */}
          {/* Using IconButton is Leading to Hydration errors in this specific component */}
          <button className="flex size-10 items-center justify-center rounded-lg text-green-700 transition-all duration-200 hover:bg-green-700/10 active:bg-green-700/20">
            <FaRegHeart />
          </button>
          <button className="flex size-10 items-center justify-center rounded-lg text-green-700 transition-all duration-200 hover:bg-green-700/10 active:bg-green-700/20">
            <TiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
