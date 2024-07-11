import { IProduct } from "../_interfaces/IProduct";
import { getProductById } from "../_lib/product-service";
import NumberInput from "../_components/UI/NumberInput";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Button, IconButton, Spinner } from "@chakra-ui/react";
import { FaTruck } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import ProductImagePicker from "../_components/Product/ProductImagePicker";
import { Suspense } from "react";
import ProductDescription from "../_components/Product/ProductDescription";

async function Page({ params }) {
  const product: IProduct = await getProductById(+params.productId);

  return (
    <div className="grid grid-cols-2 py-10">
      <Suspense fallback={<Spinner colorScheme="green" />}>
        <ProductImagePicker images={product.images} title={product.title} />
      </Suspense>
      <ProductDescription product={product} />
    </div>
  );
}

export default Page;
