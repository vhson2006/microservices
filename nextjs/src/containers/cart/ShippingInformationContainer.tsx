import {
  Box,
  useColorModeValue,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShippingInformation } from "../../components/cart/ShippingInformation";
import { common } from "../../configs/consts";
import { getUserCart } from "../../stores/cart";
import { createOrder } from "../../utils/api";

export const ShippingInformationContainer = (props: any) => {
  const { isServer } = props;
  const { t } = useTranslation("common");

  const toast = useToast();
  const dispatch = useDispatch();
  const { data, error } = useSelector(({ cart }: any) => cart);

  useEffect(() => {
    if (!isServer) {
      if (localStorage.getItem("cart")) {
        dispatch(
          getUserCart({
            params: JSON.parse(localStorage.getItem("cart") as string),
          })
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createOrderHandler = async (inputs: any) => {
    const { name, address, phone } = inputs;
    const response = await createOrder({
      name: name,
      address: address,
      phone: phone,
      params: data.map((e: any) => ({
        userProductId: e.id,
        userId: e.userId,
        cardName: e.name,
        image: e.rawImage,
        code: e.code,
        rarity: e.rarity,
        releaseDate: e.releaseDate,
        box: e.box,
        price: e.price,
        quantity: e.currentQuantity,
      })),
    });

    if (response.status === common.INCORRECT) {
      toast({
        title: t("cart#fetch#message#title"),
        description: t("cart#fetch#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      localStorage.setItem("cart", "[]");
      toast({
        title: t("cart#fetch#message#title"),
        description: t("cart#fetch#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Router.push("/shop");
    }
  };

  return (
    <Box
      flex="1"
      bg={useColorModeValue("white", "gray.800")}
      px={{ base: "4", md: "8", lg: "12", xl: "20" }}
      py={{ base: "6", md: "8", lg: "12", xl: "20" }}
    >
      <Stack spacing={{ base: "16", lg: "20" }}>
        <Stack spacing={{ base: "6", md: "10" }}>
          <Heading size="md">{t("cart#shipping-info")}</Heading>
          <ShippingInformation createOrder={createOrderHandler} />
        </Stack>
      </Stack>
    </Box>
  );
};
