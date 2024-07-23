"use client";

import {
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
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";
import { useSearchQuery } from "@/app/_lib/search-query";
import { redirect, useRouter } from "next/navigation";
import { getCategoryList } from "@/app/_lib/product-service";
import Link from "next/link";

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { query, updateQuery } = useSearchQuery();
  const [category, setCategory] = useState<any[]>([]);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    async function getCategories() {
      const categories = await getCategoryList();
      setCategory(categories);
    }

    getCategories();
  });

  return (
    <div className="border-b border-slate-300">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-2 py-5">
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
        <IconButton
          aria-label="Cart Button"
          icon={<TiShoppingCart />}
          variant="ghost"
        />
        <IconButton
          aria-label="Cart Button"
          icon={<FaRegHeart />}
          variant="ghost"
        />
        <Button variant="outline" colorScheme="green" ref={btnRef}>
          Login
        </Button>
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
      </div>
    </div>
  );
}

export default Navigation;
