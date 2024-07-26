"use client";

import { Button, Input, useNumberInput } from "@chakra-ui/react";

function NumberInput({ max, quantity }: { max?: number; quantity?: number }) {
  const {
    getDecrementButtonProps,
    getIncrementButtonProps,
    getInputProps,
    value,
  } = useNumberInput({
    defaultValue: 1,
    value: quantity,
    min: 1,
    max: max,
    step: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const inp = getInputProps();

  console.log(inp);

  return (
    <div className="flex items-center gap-5">
      <Button colorScheme="green" {...dec}>
        -
      </Button>
      <Input colorScheme="green" {...inp} width={70} textAlign="center" />
      <Button colorScheme="green" {...inc}>
        +
      </Button>
    </div>
  );
}

export default NumberInput;
