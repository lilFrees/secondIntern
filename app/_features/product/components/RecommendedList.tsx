import { IProduct } from "@/app/_features/product/interfaces/IProduct";
import RecommendedProducts from "./RecommendedProducts";
import "swiper/css";
import { getRecommendedByCategory } from "../services/product-service";

async function RecommendedList({
  category,
  currentProductId,
}: {
  category: IProduct["category"];
  currentProductId: number;
}) {
  const recommended: IProduct[] = await getRecommendedByCategory(category);
  const filtered = recommended.filter((prod) => prod.id !== currentProductId);

  return (
    <div className="size-full">
      <RecommendedProducts recommended={filtered} />
    </div>
  );
}

export default RecommendedList;
