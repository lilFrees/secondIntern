import NumberInput from "../UI/NumberInput";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Button, IconButton, Spinner } from "@chakra-ui/react";
import { FaTruck } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { IProduct } from "@/app/_interfaces/IProduct";
import StarRating from "../UI/StarRating";

function ProductInfo({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <div>{product.reviews.length} review(s)</div>
      </div>
      <h1 className="font text-3xl font-semibold">{product.title}</h1>
      <div className="text-lg">$ {product.price}</div>
      <NumberInput stock={product.stock} />
      <div className="flex items-center gap-5">
        <Button
          className="font-semibold text-white"
          colorScheme="green"
          flexGrow={1}
          leftIcon={<TiShoppingCart />}
        >
          Add to cart
        </Button>
        <IconButton
          aria-label="Add to favorites"
          variant="ghost"
          icon={<FaRegHeart />}
          colorScheme="green"
        />
      </div>
      <div className="flex flex-col gap-5 rounded-md bg-slate-200/75 px-4 py-7">
        <div className="flex gap-5">
          <div className="flex gap-5">
            <FaTruck />
          </div>
          <div className="flex flex-col gap-2">
            <div>Delivery</div>
            <div className="text-sm text-green-500">Free delivery</div>
            <p className="text-sm">{product.shippingInformation}</p>
          </div>
        </div>
        <div className="h-px w-full bg-slate-300"></div>
        <div className="flex gap-5">
          <HiOutlineSwitchHorizontal />
          <div className="flex flex-col gap-2">
            <div>Return Policy</div>
            <p className="text-sm">{product.returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
