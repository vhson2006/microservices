import { HStack, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export const Rating = (props: any) => {
  const { rating = 0, max = 5, size = "md" } = props;
  const color = "gray.300";
  const activeColor = "green.500";
  return (
    <HStack spacing="0.5">
      {Array.from({ length: max })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            key={index}
            as={FaStar}
            fontSize={size}
            color={index <= rating ? activeColor : color}
          />
        ))}
    </HStack>
  );
};
