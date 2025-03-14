import Image from "next/image";
import Link from "next/link";
import { ICategory } from "../interfaces";

function CategoryCard({ cat }: { cat: ICategory }) {
  return (
    <Link
      href={`/catalog/${cat.slug}`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-200"
    >
      <Image
        src={cat.image ?? ""}
        alt="Beauty products"
        // placeholder="blur"
        sizes="(max-width: 768px) 50vw, 25vw"
        className="absolute z-10 object-cover transition-all duration-300 hover:scale-110"
        fill
      />
      <div className="absolute inset-0 z-[15] bg-white/70"></div>
      <div className="z-20 text-xl font-bold">{cat.name}</div>
    </Link>
  );
}

export default CategoryCard;
