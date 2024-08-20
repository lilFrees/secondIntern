"use client";

import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import brandsData from "@/app/_data/brands.json";

import { MdOutlineFilterList } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { useFilter } from "@/app/_hooks/useFilters";
import useScreenSize from "@/app/_hooks/useScreenSize";

function SearchSidebar({ brandsList }: { brandsList: string[] }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const {
    priceRange,
    brands,
    updatePriceRange,
    clearPriceRange,
    addBrand,
    removeBrand,
    clearBrands,
  } = useFilter();

  const displayedBrands = !isExpanded ? brandsList.slice(0, 3) : brandsList;

  const handlePriceRangeChange = (newRange: [number, number]) => {
    updatePriceRange(newRange);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updatePriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updatePriceRange([priceRange[0], value]);
  };

  const handleBrandChange = (brand: string, isChecked: boolean) => {
    if (isChecked) {
      addBrand(brand);
    } else {
      removeBrand(brand);
    }
  };

  return (
    <div className="flex flex-grow flex-col gap-5 md:basis-[30%]">
      <div className="flex w-full items-center justify-between">
        <div className="text-lg font-semibold">Price</div>
        <button
          className="text-blue-400 hover:underline"
          onClick={clearPriceRange}
        >
          Clear
        </button>
      </div>
      <RangeSlider
        value={priceRange}
        onChange={handlePriceRangeChange}
        step={10}
        colorScheme="green"
        size="lg"
        max={50000}
        min={0}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} width={5} height={5} />
        <RangeSliderThumb index={1} width={5} height={5} />
      </RangeSlider>
      <InputGroup>
        <InputLeftElement className="text-gray-400">from</InputLeftElement>
        <Input
          type="number"
          value={priceRange[0]}
          onChange={handleMinPriceChange}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement className="text-gray-400">to</InputLeftElement>
        <Input
          type="number"
          value={priceRange[1]}
          onChange={handleMaxPriceChange}
        />
      </InputGroup>
      <div className="flex w-full items-center justify-between">
        <div className="text-lg font-semibold">Brands</div>
        <button className="text-blue-400 hover:underline" onClick={clearBrands}>
          Clear
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {displayedBrands.map((brand, i) => (
          <Checkbox
            key={i}
            isChecked={brands.includes(brand)}
            onChange={(e) => handleBrandChange(brand, e.target.checked)}
          >
            {brand}
          </Checkbox>
        ))}
        <button
          className="flex items-center gap-2 self-start text-blue-600 *:flex *:items-center *:gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span>
              Show Less <FaChevronUp />{" "}
            </span>
          ) : (
            <span>
              Show More <FaChevronDown />{" "}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function SideBar() {
  const { width } = useScreenSize();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const btnRef = useRef(null);

  const [allBrands, setAllBrands] = useState<string[]>(brandsData.brands);

  useEffect(() => {
    const brandsChannels = new BroadcastChannel("brandChannel");
    brandsChannels.onmessage = (e) => {
      if (e.data.type === "UPDATE") {
        setAllBrands(e.data.brandList);
      }
    };
    return () => {
      brandsChannels.close();
    };
  }, []);

  return (
    <div>
      {width <= 768 && (
        <div>
          <IconButton
            aria-label="Filter toggle"
            icon={<MdOutlineFilterList fontSize={35} />}
            onClick={onOpen}
            ref={btnRef}
          />
          <Drawer
            isOpen={isOpen}
            placement="top"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody p={10}>
                <SearchSidebar brandsList={allBrands} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      )}

      {width > 768 && <SearchSidebar brandsList={allBrands} />}
    </div>
  );
}

export default SideBar;
