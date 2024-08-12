"use client";
import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { Suspense, useState } from "react";

function ProductImagePicker({ images, title }) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  return (
    <div className="flex">
      <div className="flex flex-col gap-1">
        {images.map((img, i) => (
          <button
            className="relative h-16 w-16 cursor-pointer overflow-hidden border border-slate-300"
            key={i}
            onClick={() => setCurrentImageIndex(i)}
          >
            <Image
              src={img}
              alt={title}
              width={200}
              height={200}
              quality={1}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="block h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
      <Suspense
        fallback={<Spinner colorScheme="green" />}
        key={currentImageIndex}
      >
        <MainImage src={images[currentImageIndex]} />
      </Suspense>
    </div>
  );
}

export default ProductImagePicker;

function MainImage({ src }) {
  const [isLoading, setIsloading] = useState(true);
  return (
    <div className="relative h-full w-full flex-1">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner colorScheme="green" />
        </div>
      )}
      <Image
        src={src}
        alt="Product image"
        fill
        className="object-contain"
        onLoad={() => setIsloading(false)}
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={10}
      />
    </div>
  );
}
