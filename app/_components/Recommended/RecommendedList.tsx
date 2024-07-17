import { IProduct } from "@/app/_interfaces/IProduct";
import { getRecommendedByCategory } from "@/app/_lib/product-service";

async function RecommendedList({
  category,
}: {
  category: IProduct["category"];
}) {
  const recommended = await getRecommendedByCategory(category);
  console.log(recommended);
  return <div className="size-full"></div>;
}

export default RecommendedList;
