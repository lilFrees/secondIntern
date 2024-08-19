"use client";

import useScreenSize from "@/app/_hooks/useScreenSize";
import { Button, Input, Spinner } from "@chakra-ui/react";

function NumberInput({
  max,
  quantity,
  onChange,
  loading,
}: {
  max: number;
  quantity: number;
  onChange: (value: number) => void;
  loading?: boolean;
}) {
  const { width } = useScreenSize();
  return (
    <div className="flex items-center gap-1 md:gap-5">
      <Button
        colorScheme="green"
        onClick={() => {
          if (quantity > 1) onChange(quantity - 1);
        }}
        size={width <= 768 ? "sm" : "md"}
      >
        -
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <Input
          colorScheme="green"
          width={width <= 768 ? "40px" : "60px"}
          textAlign="center"
          value={loading ? "..." : quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 0 && value <= max) onChange(value);
          }}
          size={width <= 768 ? "sm" : "md"}
        />
      )}
      <Button
        colorScheme="green"
        onClick={() => {
          if (quantity < max) onChange(quantity + 1);
        }}
        size={width <= 768 ? "sm" : "md"}
      >
        +
      </Button>
    </div>
  );
}

export default NumberInput;
