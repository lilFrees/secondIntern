import { IProduct } from "@/app/_interfaces/IProduct";
import { getRecommendedByCategory } from "@/app/_lib/product-service";
import RecommendedProducts from "./RecommendedProducts";
import "swiper/css";

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
