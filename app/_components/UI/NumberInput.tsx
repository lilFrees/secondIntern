"use client";

import { Button, Input, useNumberInput } from "@chakra-ui/react";

function NumberInput({ stock }) {
  const {
    getDecrementButtonProps,
    getIncrementButtonProps,
    getInputProps,
    value,
  } = useNumberInput({
    defaultValue: 1,
    min: 1,
    max: stock,
    step: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const inp = getInputProps();

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
