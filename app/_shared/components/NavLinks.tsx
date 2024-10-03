import { getCategoryList } from "@/app/_features/product/services/product-service";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useQuery } from "react-query";

function NavLinks({
  isOpen,
  onClose,
  btnRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<any>;
}) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategoryList();

      return res;
    },
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement="left"
      size="sm"
      preserveScrollBarGap={true}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Catalog</DrawerHeader>
        <DrawerBody className="flex flex-col gap-2">
          {!categories && (
            <div className="text-sm font-semibold">Something went wrong</div>
          )}
          {isLoading && <Spinner />}
          {categories &&
            categories.map((cat, i) => (
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
  );
}

export default NavLinks;
