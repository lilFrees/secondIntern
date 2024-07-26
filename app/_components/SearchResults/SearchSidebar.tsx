"use client";

import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";
import brandsData from "@/app/_data/brands.json";

import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { useFilter } from "@/app/_lib/search-filters";

function SearchSidebar() {
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

  const allBrands = brandsData.brands;

  const displayedBrands = !isExpanded ? allBrands.slice(0, 3) : allBrands;

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
    <div className="flex flex-grow basis-[30%] flex-col gap-5">
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

export default SearchSidebar;
