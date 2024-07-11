"use client";

import Image from "next/image";
import MerchantForm from "../_components/MerchantForm/MerchantForm";
import image from "@/public/handshake.jpg";

function Page() {
  return (
    <div className="py-10">
      <h1 className="text-2xl">Become a Green Haven Seller!</h1>
      <div className="mt-5 h-px w-full bg-slate-300" />
      <div className="flex gap-10">
        <div className="flex-1">
          <MerchantForm />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="rounded-2xl bg-green-100 px-10 py-14 text-center">
            <div className="mb-10 text-lg font-semibold">
              Would you like to sell your products on Green Haven?
            </div>
            <div className="text-3xl font-bold text-green-950">Apply Today</div>
          </div>
          <div className="relative mx-auto mt-10 h-60 w-60 overflow-hidden">
            <Image
              src={image}
              alt="Handshake"
              fill
              className="object-cover"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
