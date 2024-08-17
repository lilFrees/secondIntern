"use client";

import useCart from "@/app/_hooks/useCart";
import { useSearchQuery } from "@/app/_hooks/useSearchQuery";
import useWishlist from "@/app/_hooks/useWishlist";
import { getCategoryList } from "@/app/_lib/product-service";
import { getUser } from "@/app/_lib/user-service";
import { MdAccountCircle } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";
import useScreenSize from "@/app/_hooks/useScreenSize";

async function fetchCategories() {
  const data = await getCategoryList();
  return data;
}

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { query, updateQuery } = useSearchQuery();
  const [category, setCategory] = useState<any[]>([]);
  const { data, status } = useSession();
  const [width, setWidth] = useState(0);
  const screenWidth = useScreenSize()!;
  useEffect(() => {
    setWidth(screenWidth.width);
  }, [screenWidth]);

  const AccountButton = useRef<any>(
    <Button
      colorScheme="green"
      variant="ghost"
      className="!hidden shrink-0 md:inline"
    >
      <Spinner colorScheme="green" />
    </Button>,
  );

  const { cartIdArray } = useCart();
  const { wishlistIdArray } = useWishlist();

  const cartCount = cartIdArray.length;
  useEffect(() => {
    if (status === "authenticated") {
      AccountButton.current = (
        <Link href="/account" className="hidden shrink-0 md:inline">
          <Button colorScheme="green">Your Profile</Button>
        </Link>
      );
    } else if (status === "unauthenticated") {
      AccountButton.current = (
        <Link href="/login" className="hidden shrink-0 md:inline">
          <Button colorScheme="green" variant="ghost">
            Login
          </Button>
        </Link>
      );
    } else {
      AccountButton.current = (
        <Button
          colorScheme="green"
          variant="ghost"
          className="hidden shrink-0 md:inline"
        >
          <Spinner colorScheme="green" />
        </Button>
      );
    }

    fetchCategories().then((data) => setCategory(data));
  }, [data, status]);

  const router = useRouter();

  const isSmallScreen = width <= 768 && width > 0;
  const isMediumScreen = width > 768;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Box
      top={0}
      left={0}
      transition="transform 0.3s ease-in-out"
      borderBottom="1px solid #e2e8f0"
      dropShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
      zIndex="50"
      bg="white"
      w="100%"
    >
      <div className="z-50 mx-auto flex w-full max-w-6xl items-center gap-5 px-1 py-2 md:px-2 md:py-5">
        <>
          <Logo />
          <Button
            ref={btnRef}
            colorScheme="green"
            onClick={onOpen}
            variant="solid"
            rightIcon={isOpen ? <IoIosClose /> : <FaBars />}
            className="!hidden md:inline"
          >
            Catalog
          </Button>
        </>

        <form onSubmit={handleSubmit} className="flex-grow">
          <InputGroup width="auto">
            <Input
              variant="filled"
              colorScheme="green"
              placeholder="Search products or else"
              borderRadius="8"
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
            />
            <InputRightElement>
              <IoSearchSharp />
            </InputRightElement>
          </InputGroup>
        </form>
        <>
          <Link href="/cart" className="hidden md:block">
            <Box className="relative inline-block">
              <IconButton
                aria-label="Cart Button"
                icon={<HiOutlineShoppingCart />}
                variant="ghost"
              />
              {cartCount > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {cartCount}
                </div>
              )}
            </Box>
          </Link>
          <Link href="/favorite" className="hidden md:block">
            <Box className="relative inline-block">
              <IconButton
                aria-label="Cart Button"
                icon={<FaRegHeart />}
                variant="ghost"
              />
              {wishlistIdArray.length > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {wishlistIdArray.length}
                </div>
              )}
            </Box>
          </Link>
          {/* ACCOUNT BUTTON */}
          {AccountButton.current}

          <Drawer
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={btnRef}
            placement="left"
            size="lg"
            preserveScrollBarGap={true}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Catalog</DrawerHeader>
              <DrawerBody className="flex flex-col gap-2">
                {category.map((cat, i) => (
                  <Link
                    href={`/catalog/${cat.slug}`}
                    key={i}
                    onClick={() => setTimeout(onClose, 500)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 z-[999999] flex h-14 w-full items-center border-t border-slate-300 bg-white *:flex *:flex-1 *:flex-col *:items-center md:hidden">
          <Link href="/">
            <Logo type="image" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/catalog">
            <RiMenuSearchLine fontSize={35} />
            <span className="text-xs">Catalog</span>
          </Link>
          <Link href="/cart">
            <Box className="relative inline-block">
              <HiOutlineShoppingCart fontSize={35} />
              {cartCount > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {cartCount}
                </div>
              )}
            </Box>
            <span className="text-xs">Cart</span>
          </Link>
          <Link href="/favorite">
            <Box className="relative inline-block">
              <FaRegHeart fontSize={35} />
              {wishlistIdArray.length > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {wishlistIdArray.length}
                </div>
              )}
            </Box>
            <span className="text-xs">Favorites</span>
          </Link>
          <Link href="/account">
            <MdAccountCircle fontSize={35} />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Navigation;
