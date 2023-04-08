import { Select, useColorModeValue } from "@chakra-ui/react";

export const ProductQuantitySelect = (props: any) => {
  const { data, updateCardQuantity } = props;
  const { id, quantity } = data;
  const changeHandle = (e: any) => {
    updateCardQuantity(id, e.target.value);
  };

  return (
    <Select
      aria-label="Select quantity"
      maxW="20"
      h={10}
      size="sm"
      borderRadius="md"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      bg={useColorModeValue("white", "gray.700")}
      onChange={changeHandle}
    >
      {Array.from(Array(Number(quantity)).keys()).map((idx) => (
        <option key={idx + 1}>{idx + 1}</option>
      ))}
    </Select>
  );
};
