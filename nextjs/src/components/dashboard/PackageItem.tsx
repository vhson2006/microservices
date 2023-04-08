import { Box, Flex, Text, useColorModeValue as mode } from "@chakra-ui/react";
import { formatPrice } from "../../helpers/prices";
import { ProductMeta } from "./ProductMeta";

export const PackageItem = (props: any) => {
  const { cardName, image, price, quantity } = props;

  return (
    <Box>
      <Flex>
        <ProductMeta
          isInStock={true}
          title={cardName}
          image={image}
          quantity={quantity}
          isBestSeller={true}
        />
        <Text pt="1" fontSize="sm" fontWeight="semibold">
          {formatPrice(price, { locale: "VI", currency: "VND" })}
        </Text>
      </Flex>
    </Box>
  );
};
