import { getProducts } from "@/app/_lib/product-service";
import ProductCard from "@/app/_components/UI/ProductCard";

async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[repeat(auto-fill,320px)] gap-5 py-5">
      {products.map((prod, i) => (
        <ProductCard prod={prod} key={i} />
      ))}
    </div>
  );
}

export default ProductList;
