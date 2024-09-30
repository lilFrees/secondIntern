"use client";

import { IProduct } from "@/app/_features/product/interfaces/IProduct";

import {
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import NumberInput from "../../../_shared/components/NumberInput";
import StarRating from "../../../_shared/components/StarRating";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../auth/hooks/userStore";
import useCart from "../../cart/hooks/useCart";
import useWishlist from "../../favorites/hooks/useWishlist";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../favorites/services/wishlist-service";
import {
  addItemToCart,
  updateCartItem,
} from "../../cart/services/cart-service";

function ProductInfo({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState<number>(1);
  const { cartIdArray } = useCart();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { user } = useUser();

  const { wishlistIdArray } = useWishlist();

  const isFavorite = wishlistIdArray.includes(product.id);
  const isInCart = cartIdArray.includes(product.id);

  function handleQuantityChange(value: number) {
    setQuantity(value);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <div>{product.reviews.length} review(s)</div>
      </div>
      <h1 className="font text-3xl font-semibold">{product.title}</h1>
      <div className="text-lg">$ {product.price}</div>
      <NumberInput
        quantity={quantity}
        max={product.stock}
        onChange={handleQuantityChange}
      />
      <div className="flex items-center gap-5">
        <Button
          className="font-semibold text-white"
          colorScheme="green"
          flexGrow={1}
          leftIcon={<TiShoppingCart />}
          onClick={() => {
            if (!user) {
              onOpen();
            } else if (isInCart) {
              updateCartItem(product.id, quantity);
            } else {
              addItemToCart(product.id, quantity);
            }
          }}
        >
          Add to cart
        </Button>
        <IconButton
          aria-label="Add to favorites"
          variant="ghost"
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          colorScheme="green"
          onClick={() => {
            isFavorite
              ? removeItemFromWishlist(product.id)
              : addItemToWishlist(product.id);
          }}
        />
      </div>
      {product.brand && (
        <div className="flex flex-col gap-2 self-start rounded-xl bg-slate-200/75 p-2">
          <div className="text-xs text-slate-500">Seller</div>
          <div>{product.brand}</div>
        </div>
      )}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex flex-col items-center gap-5 p-5">
            <h1 className="text-2xl font-semibold">
              You need to be logged in to add items to your cart
            </h1>
            <Link href="/login">
              <Button colorScheme="green">Login now</Button>
            </Link>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductInfo;
