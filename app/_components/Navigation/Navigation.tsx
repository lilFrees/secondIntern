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
import { useRef } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
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

        <InputGroup width="auto" className="flex-1">
          <Input
            variant="filled"
            colorScheme="green"
            placeholder="Search products or else"
            borderRadius="8"
          />
          <InputRightElement>
            <IoSearchSharp />
          </InputRightElement>
        </InputGroup>
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
        <Button variant="outline" colorScheme="green">
          Login
        </Button>
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Catalog</DrawerHeader>
          <DrawerBody>Content</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Navigation;
