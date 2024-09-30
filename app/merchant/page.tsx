"use client";

import Image from "next/image";
import MerchantForm from "../_features/merchant/components/MerchantForm";
import image from "@/public/handshake.jpg";
import { Badge } from "@chakra-ui/react";

function Page() {
  return (
    <div className="py-10">
      <h1 className="text-lg">Become a Green Haven Seller!</h1>
      <div className="mt-5 h-px w-full bg-slate-300" />
      <div className="mb-10 flex gap-10">
        <div className="flex flex-1 flex-col">
          <div className="rounded-2xl py-14">
            <div className="mb-5 text-3xl font-semibold">
              Would you like to sell your products on Green Haven?
            </div>
            <div className="text-lg font-bold text-slate-700">Apply Today</div>
          </div>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt="Handshake"
              fill
              className="object-cover"
              placeholder="blur"
            />
          </div>
        </div>
        <div className="flex-1">
          <MerchantForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
