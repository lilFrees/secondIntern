"use client";

import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";

function SearchSidebar() {
  return (
    <div className="flex flex-grow basis-[30%] flex-col gap-5 border border-dashed border-blue-700">
      <RangeSlider
        defaultValue={[0, 100]}
        step={1}
        colorScheme="green"
        size="lg"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0}></RangeSliderThumb>
        <RangeSliderThumb index={1}></RangeSliderThumb>
      </RangeSlider>
    </div>
  );
}

export default SearchSidebar;
