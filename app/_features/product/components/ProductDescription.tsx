"use client";

import { IProduct } from "@/app/_features/product/interfaces/IProduct";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReviewList from "./ReviewList";

function ProductDescription({ product }: { product: IProduct }) {
  const [currentPage, setCurrentPage] = useState<0 | 1>(0);

  return (
    <div className="col-span-2 mt-10">
      <div className="flex">
        <AnimatePresence>
          <CustomButton
            isActive={currentPage === 0}
            onclick={() => setCurrentPage(0)}
            key={1}
          >
            Description
          </CustomButton>
          <CustomButton
            onclick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            key={2}
          >
            Reviews
          </CustomButton>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-5">
            {currentPage === 0 && product.description}
            {currentPage === 1 && <ReviewList reviewList={product.reviews} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ProductDescription;

function CustomButton({
  children,
  isActive,
  onclick,
}: {
  children: any;
  isActive: boolean;
  onclick: () => void;
}) {
  return (
    <div className="relative">
      <button onClick={onclick} className="relative z-10 px-5 py-2">
        {children}
      </button>
      {isActive && (
        <motion.div
          className="absolute inset-0 h-full w-full border-b border-b-green-500 bg-slate-200"
          layoutId="underline"
        ></motion.div>
      )}
    </div>
  );
}
