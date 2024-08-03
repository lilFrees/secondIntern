"use client";

import { Button, Input } from "@chakra-ui/react";

function NumberInput({
  max,
  quantity,
  onChange,
}: {
  max: number;
  quantity: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-5">
      <Button
        colorScheme="green"
        onClick={() => {
          if (quantity > 1) onChange(quantity - 1);
        }}
      >
        -
      </Button>
      <Input
        colorScheme="green"
        width={70}
        textAlign="center"
        value={quantity}
      />
      <Button
        colorScheme="green"
        onClick={() => {
          if (quantity < max) onChange(quantity + 1);
        }}
      >
        +
      </Button>
    </div>
  );
}

export default NumberInput;
