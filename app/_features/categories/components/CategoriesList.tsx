
import beauty from "@/public/categories/beauty.jpg";
import fragrance from "@/public/categories/fragrance.jpg";
import furniture from "@/public/categories/furniture.jpg";
import groceries from "@/public/categories/groceries.jpg";
import homedecor from "@/public/categories/home-decor.jpg";
import kitchen from "@/public/categories/kitchen-decor.jpg";
import laptops from "@/public/categories/laptops.png";
import menshirts from "@/public/categories/mens-shirt.jpg";
import menshoes from "@/public/categories/mens-shoes.jpg";
import menwatch from "@/public/categories/mens-watches.jpg";
import mobile from "@/public/categories/mobile-accessories.jpg";
import motor from "@/public/categories/motorcycle.jpg";
import skincare from "@/public/categories/skincare.jpg";
import phones from "@/public/categories/smartphones.jpg";
import sport from "@/public/categories/sport-accessories.jpg";
import sunglasses from "@/public/categories/sunglasses.jpg";
import tablets from "@/public/categories/tablets.jpg";
import tops from "@/public/categories/tops.jpg";
import vehicle from "@/public/categories/vehicle.jpg";
import womendress from "@/public/categories/women-dress.webp";
import womenbags from "@/public/categories/womens-bags.webp";
import jewelry from "@/public/categories/womens-jewelry.jpg";
import womenshoes from "@/public/categories/womens-shoes.jpg";
import womenwatch from "@/public/categories/womens-watches.jpg";
import CategoryCard from "./CategoryCard";
import { getCategoryList } from "../../product/services/product-service";

const bgImages = [
  beauty,
  fragrance,
  furniture,
  groceries,
  homedecor,
  kitchen,
  laptops,
  menshirts,
  menshoes,
  sport,
  menwatch,
  mobile,
  motor,
  phones,
  skincare,
  sunglasses,
  tablets,
  tops,
  vehicle,
  womenbags,
  womendress,
  jewelry,
  womenshoes,
  womenwatch,
];

async function CategoriesList({ preview }: { preview?: boolean }) {
  const categories = await getCategoryList();
  const displayContent = preview ? categories.slice(0, 6) : categories;

  return (
    <div className="grid auto-rows-[200px] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {displayContent.map((cat, i) => (
        <CategoryCard cat={cat} image={bgImages[i]} key={i} />
      ))}
    </div>
  );
}

export default CategoriesList;
