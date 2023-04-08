import {
  AspectRatio,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { ProductQuantitySelect } from "./ProductQuantity";

export const ProductItem = (props: any) => {
  const { product, updateCardQuantity, removeItem } = props;

  return (
    <Flex justify="space-between">
      <Stack direction="row" spacing="5">
        <AspectRatio ratio={6 / 9} width="92px">
          <Image src={product.image} alt={product.name} borderRadius="md" />
        </AspectRatio>
        <Stack spacing="3">
          <Stack spacing="1">
            <Text fontWeight="semibold">{product.name}</Text>
          </Stack>
          <Flex>
            <ProductQuantitySelect
              data={product}
              updateCardQuantity={updateCardQuantity}
            />
            <IconButton
              icon={<FiTrash2 fontSize="1.25rem" />}
              variant="ghost"
              aria-label="Xóa"
              onClick={() => removeItem(product.id)}
            />
          </Flex>
        </Stack>
      </Stack>
      <Text fontWeight="medium">{product.price}</Text>
    </Flex>
  );
};
