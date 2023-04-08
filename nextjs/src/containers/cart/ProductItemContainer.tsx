import {
  Box,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { updateCardQuantity, getUserCart } from "../../stores/cart";
import { ProductItem } from "../../components/cart/ProductItem";

export const ProductItemContainer = (props: any) => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(({ cart }: any) => cart);
  const { t } = useTranslation("common");

  const updateCardQuantityHandler = (id: string, quantity: number) => {
    dispatch(
      updateCardQuantity({
        id: id,
        quantity: quantity,
      })
    );
  };

  const removeItemHandler = (id: string) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        JSON.parse(localStorage.getItem("cart") as string).filter(
          (item: any) => item != id
        )
      )
    );
    dispatch(
      getUserCart({
        params: JSON.parse(localStorage.getItem("cart") as string),
      })
    );
  };

  return (
    <Box
      flex="1"
      maxW={{ lg: "md", xl: "40rem" }}
      bg={useBreakpointValue({
        base: useColorModeValue("white", "gray.800"),
        md: "inherit",
      })}
      px={{ base: "4", md: "8", lg: "12", xl: "20" }}
      py={{ base: "6", md: "8", lg: "12", xl: "20" }}
    >
      <Stack spacing={{ base: "6", md: "10" }}>
        <Heading size="md">{t("cart#detail-order")}</Heading>
        <Stack spacing="8">
          <Stack spacing="6">
            {data.map((product: any, idx: number) => (
              <Stack key={idx}>
                <ProductItem
                  product={product}
                  updateCardQuantity={updateCardQuantityHandler}
                  removeItem={removeItemHandler}
                />
                <Divider />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
