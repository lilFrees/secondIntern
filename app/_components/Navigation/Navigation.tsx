"use client";

import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  useDisclosure,
} from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import { useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
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
          size="sm"
          rightIcon={isOpen ? <IoIosClose /> : <FaBars />}
        >
          Catalog
        </Button>

        <InputGroup size="sm" width="auto" className="flex-1">
          <Input
            variant="filled"
            colorScheme="teal"
            placeholder="Search products..."
            borderRadius="8"
          />
          <InputRightElement>
            <IoSearchSharp />
          </InputRightElement>
        </InputGroup>
        <IconButton
          aria-label="Cart Button"
          icon={<TiShoppingCart />}
          size="sm"
        />
        <IconButton aria-label="Cart Button" icon={<FaRegHeart />} size="sm" />
        <Button variant="outline" size="sm" colorScheme="green">
          Login
        </Button>
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Catalog</DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Navigation;
