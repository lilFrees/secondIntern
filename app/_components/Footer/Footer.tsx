import Image from "next/image";
import Link from "next/link";
import google from "@/public/google.png";
import applestore from "@/public/applestore.png";
import { IconButton } from "@chakra-ui/react";
import { FaTelegramPlane, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <div className="mt-auto bg-black/80 text-white">
      <div className="mx-auto max-w-6xl space-y-10 px-2 py-10">
        <div className="grid w-full grid-cols-5 gap-24">
          <div className="col-span-2 flex flex-col gap-2">
            <p className="text-sm">Any questions for us?</p>
            <Link href="tel:+998936604530" className="text-xl">
              +998 93 660 45 30
            </Link>
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-full">
                <Image
                  fill
                  src={google}
                  alt="Play Market"
                  className="h-auto w-auto rounded-xl object-contain outline-1 outline-white"
                />
              </div>
              <div className="relative h-16 w-full">
                <Image
                  fill
                  src={applestore}
                  alt="App Store"
                  className="h-auto w-auto rounded-xl object-contain outline-1 outline-white"
                />
              </div>
            </div>
            <Link href="/locations" className="underline">
              Locations in Tashkent
            </Link>
          </div>
          <div className="flex flex-col gap-2 *:text-sm">
            <h3 className="mb-2 text-base font-semibold">Company</h3>
            <Link href="#">About us</Link>
            <Link href="#">News</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Become a seller</Link>
          </div>
          <div className="flex flex-col gap-2 *:text-sm">
            <h3 className="mb-2 font-semibold">Company</h3>
            <Link href="#">About us</Link>
            <Link href="#">News</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Become a seller</Link>
          </div>
          <div className="flex flex-col gap-2 *:text-sm">
            <h3 className="mb-2 font-semibold">Company</h3>
            <Link href="#">About us</Link>
            <Link href="#">News</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Become a seller</Link>
          </div>
        </div>
        <div className="h-px w-full bg-slate-300/50" />
        <div className="flex">
          <div className="basis-1/2 text-xs">
            2024 © greenhavenexpress.com All rights reserved. The indicated
            value of the goods and the terms of their purchase are valid as of
            the current date
          </div>
          <div className="ml-auto flex items-center gap-5">
            <IconButton
              aria-label="Telegram"
              className="rounded-full"
              colorScheme="green"
              icon={<FaTelegramPlane />}
            ></IconButton>
            <IconButton
              aria-label="Telegram"
              className="rounded-full"
              colorScheme="green"
              icon={<FaInstagram />}
            ></IconButton>
            <IconButton
              aria-label="Telegram"
              className="rounded-full"
              colorScheme="green"
              icon={<FaFacebookF />}
            ></IconButton>
            <IconButton
              aria-label="Telegram"
              className="rounded-full"
              colorScheme="green"
              icon={<FaYoutube />}
            ></IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
