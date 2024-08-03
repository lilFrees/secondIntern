"use client";

import { useCart } from "@/app/_context/CartContext";
import { useFavorite } from "@/app/_context/FavoriteContext";
import { getCategoryList } from "@/app/_lib/product-service";
import { useSearchQuery } from "@/app/_lib/search-query";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { query, updateQuery } = useSearchQuery();
  const { favorites } = useFavorite();
  const { cart } = useCart();

  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="border-b border-slate-300">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-2 py-5">
        <Logo />
        <Button
          ref={btnRef}
          colorScheme="green"
          onClick={onOpen}
          variant="solid"
          rightIcon={isOpen ? <IoIosClose /> : <FaBars />}
        >
          Catalog
        </Button>

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
        <Link href="/cart">
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
        <Link href="/favorite">
          <Box className="relative inline-block">
            <IconButton
              aria-label="Cart Button"
              icon={<FaRegHeart />}
              variant="ghost"
            />
            {favoritesCount > 0 && (
              <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                {favoritesCount}
              </div>
            )}
          </Box>
        </Link>
        <Link href="/login">
          <Button colorScheme="green" ref={btnRef}>
            Login
          </Button>
        </Link>
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
              <Suspense fallback={<Spinner />}>
                <Categories closeHandler={onClose} />
              </Suspense>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default Navigation;

async function Categories({ closeHandler }: { closeHandler: () => void }) {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await getCategoryList();
      setCategory(categories);
    }

    getCategories();
  }, []);

  return (
    <>
      {category.map((cat, i) => (
        <Link
          href={`/catalog/${cat.slug}`}
          key={i}
          onClick={() => setTimeout(closeHandler, 500)}
        >
          {cat.name}
        </Link>
      ))}
    </>
  );
}
