"use client";

import Image from "next/image";
import Link from "next/link";
import google from "@/public/google.png";
import applestore from "@/public/applestore.png";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  IconButton,
} from "@chakra-ui/react";
import { FaTelegramPlane, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import useScreenSize from "@/app/_hooks/useScreenSize";
import { useEffect, useState } from "react";

function Footer() {
  const [width, setWidth] = useState(0);
  const screenWidth = useScreenSize()!;
  useEffect(() => {
    setWidth(screenWidth.width);
  }, [screenWidth]);

  const isSmallScreen = width <= 768 && width > 0;
  const isMediumScreen = width > 768;
  return (
    <div className="mt-auto bg-black/80 pb-20 text-white md:pb-0">
      <div className="mx-auto max-w-6xl space-y-10 px-2 py-10">
        <div className="grid w-full grid-cols-1 text-gray-400 md:grid-cols-5 md:gap-24">
          <div className="flex flex-col gap-2 text-center md:col-span-2 md:text-left">
            <p className="text-sm">Any questions for us?</p>
            <Link href="tel:+998936604530" className="text-xl">
              +998 93 660 45 30
            </Link>
            <div className="mb-10 flex flex-col items-center gap-2 md:items-start md:gap-5">
              <h2 className="text-gray-100">Download the app</h2>

              <div className="flex flex-col gap-5 md:flex-row">
                <div className="relative h-10 w-32">
                  <Image
                    fill
                    src={google}
                    alt="Play Market"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="h-auto w-auto rounded-xl object-contain outline-1 outline-white"
                  />
                </div>
                <div className="relative h-10 w-32">
                  <Image
                    fill
                    src={applestore}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    alt="App Store"
                    className="h-auto w-auto rounded-xl object-contain outline-1 outline-white"
                  />
                </div>
              </div>
            </div>
          </div>
          {isMediumScreen && (
            <>
              <div className="flex flex-col gap-2 *:text-sm">
                <h3 className="mb-2 font-semibold text-gray-100">Company</h3>
                <Link href="#">About us</Link>
                <Link href="#">News</Link>
                <Link href="#">Contact</Link>
                <Link href="/merchant">Become a seller</Link>
              </div>
              <div className="flex flex-col gap-2 *:text-sm">
                <h3 className="mb-2 font-semibold text-gray-100">
                  For businesses
                </h3>
                <Link href="/merchant">Become a seller</Link>
              </div>
              <div className="flex flex-col gap-2 *:text-sm">
                <h3 className="mb-2 font-semibold text-gray-100">Company</h3>
                <Link href="#">About us</Link>
                <Link href="#">News</Link>
                <Link href="#">Contact</Link>
                <Link href="/merchant">Become a seller</Link>
              </div>
            </>
          )}
          {isSmallScreen && (
            <>
              <Accordion allowToggle borderColor="gray">
                <AccordionItem py={2}>
                  <AccordionButton
                    display="flex"
                    justifyContent="center"
                    gap={2}
                  >
                    <h2 className="text-center">Company</h2>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} display="flex" flexDir="column">
                    <Link href="#">About us</Link>
                    <Link href="#">News</Link>
                    <Link href="#">Contact</Link>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem py={2}>
                  <AccordionButton
                    display="flex"
                    justifyContent="center"
                    gap={2}
                  >
                    <h2 className="text-center">For businesses</h2>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} display="flex" flexDir="column">
                    <Link href="/merchant">Become a seller</Link>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
        {isMediumScreen && <div className="h-px w-full bg-slate-300/50" />}
        <div className="flex flex-col gap-5 text-center md:flex-row md:text-left">
          <div className="basis-1/2 text-xs">
            2024 © greenhavenexpress.com All rights reserved. The indicated
            value of the goods and the terms of their purchase are valid as of
            the current date
          </div>
          <div className="ml-auto flex w-full flex-wrap items-center justify-center gap-5 md:justify-normal">
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
