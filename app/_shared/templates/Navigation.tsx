"use client";

import { useUser } from "@/app/_features/auth/hooks/userStore";
import useCart from "@/app/_features/cart/hooks/useCart";
import useWishlist from "@/app/_features/favorites/hooks/useWishlist";
import { useSearchQuery } from "@/app/_features/search/hooks/useSearchQuery";
import useScreenSize from "@/app/_shared/hooks/useScreenSize";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { lazy, useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import Logo from "../../_shared/components/Logo";

const NavLinks = lazy(() => import("../components/NavLinks"));

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { query, updateQuery } = useSearchQuery();
  const { user } = useUser();
  const [width, setWidth] = useState(0);
  const screenWidth = useScreenSize()!;

  useEffect(() => {
    setWidth(screenWidth.width);
  }, [screenWidth]);

  const AccountButton = useRef<any>(
    <Button
      colorScheme="green"
      variant="ghost"
      className="!hidden shrink-0 md:!inline"
    >
      Login
    </Button>,
  );

  const { cartIdArray } = useCart();
  const { wishlistIdArray } = useWishlist();

  const cartCount = cartIdArray.length;
  const wishCount = wishlistIdArray.length;
  useEffect(() => {
    if (user) {
      AccountButton.current = (
        <Link href="/account" className="!hidden shrink-0 md:!inline">
          <Button colorScheme="green">Your Profile</Button>
        </Link>
      );
    } else {
      AccountButton.current = (
        <Link href="/login" className="!hidden shrink-0 md:!inline">
          <Button colorScheme="green" variant="ghost">
            Login
          </Button>
        </Link>
      );
    }
  }, [user]);

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
      <div className="fixed left-0 top-0 z-[60] mx-auto flex w-full max-w-6xl items-center gap-5 border-b border-slate-300 bg-white px-1 py-2 md:static md:border-0 md:px-2 md:py-5">
        <>
          <Logo />
          <Button
            ref={btnRef}
            colorScheme="green"
            onClick={onOpen}
            variant="solid"
            rightIcon={isOpen ? <IoIosClose /> : <FaBars />}
            className="!hidden md:!inline"
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
              {user && cartCount > 0 && (
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
              {user && wishCount > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {wishCount}
                </div>
              )}
            </Box>
          </Link>
          {/* ACCOUNT BUTTON */}
          {AccountButton.current}

          {/* DRAWER */}
          <NavLinks btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
        </>
        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-0 flex h-14 w-full items-center border-t border-slate-300 bg-white *:flex *:flex-1 *:flex-col *:items-center md:hidden">
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
              {user && cartCount > 0 && (
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
              {user && wishCount > 0 && (
                <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {wishCount}
                </div>
              )}
            </Box>
            <span className="text-xs">Favorites</span>
          </Link>
          <Link href={user ? "/account" : "/login"}>
            <MdAccountCircle fontSize={35} />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </Box>
  );
}

export default Navigation;
