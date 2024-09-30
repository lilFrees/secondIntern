import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
} from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDescription from "../../_features/product/components/ProductDescription";
import ProductImagePicker from "../../_features/product/components/ProductImagePicker";
import ProductInfo from "../../_features/product/components/ProductInfo";
import RecommendedList from "../../_features/product/components/RecommendedList";
import { getProductById } from "@/app/_features/product/services/product-service";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function Page({ params }) {
  const product = await getProductById(+params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="">
      <Breadcrumb separator="/" className="mt-5">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/catalog">Catalog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/catalog/${product.category}`}>
            {capitalizeFirstLetter(product.category)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{product.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="grid grid-cols-2 gap-5 py-10">
        <Suspense fallback={<Spinner colorScheme="green" />}>
          <ProductImagePicker images={product.images} title={product.title} />
        </Suspense>
        <ProductInfo product={product} />
        <Suspense fallback={<Spinner colorScheme="green" />}>
          <ProductDescription product={product} />
        </Suspense>
        <div className="col-span-2">
          <h3 className="my-10 text-3xl font-semibold">
            Products you might like
          </h3>
          <Suspense fallback={<Spinner colorScheme="green" />}>
            <RecommendedList
              category={product.category}
              currentProductId={product.id}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Page;
