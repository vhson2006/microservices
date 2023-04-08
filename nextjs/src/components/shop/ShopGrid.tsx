import { Box, SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

export const ShopGrid = (props: any) => {
  const { productList, addToCart } = props;
  return (
    <Box
      maxW="10xl"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={{ base: "8", lg: "10" }}
      >
        {productList.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
