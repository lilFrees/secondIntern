import notfound2 from "@/public/notfound2.png";
import Image from "next/image";

export default function NotFound({ error }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 py-10">
      <div className="relative h-72 w-full">
        <Image
          src={notfound2}
          alt="Not Found Illustration"
          fill
          className="block h-full w-full object-contain"
        />
      </div>
      <h2 className="text-3xl font-bold">
        {error?.message || "Results not found"}
      </h2>
      <p className="text-lg">Try searching using different keywords</p>
    </div>
  );
}
