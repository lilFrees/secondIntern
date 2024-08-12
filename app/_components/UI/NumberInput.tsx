"use client";

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
      {loading ? (
        <Spinner />
      ) : (
        <Input
          colorScheme="green"
          width={70}
          textAlign="center"
          value={loading ? "..." : quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value > 0 && value <= max) onChange(value);
          }}
        />
      )}
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
