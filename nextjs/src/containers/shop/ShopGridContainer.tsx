import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ShopGrid } from "../../components/shop/ShopGrid";
import useTranslation from "next-translate/useTranslation";

export const ShopGridContainer = (props: any) => {
  const toast = useToast();
  const { t } = useTranslation("common");

  const { data, error, loading } = useSelector(({ products }: any) => products);

  const addToCart = (id: string) => {
    const currentCart = localStorage.getItem("cart")
      ? localStorage.getItem("cart")
      : "[]";
    const cartArr = JSON.parse(currentCart as string);
    cartArr.push(id);
    localStorage.setItem("cart", JSON.stringify(cartArr));
    toast({
      title: t("shops#add#message#title"),
      description: t("shops#add#message#success"),
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return <ShopGrid addToCart={addToCart} productList={data} />;
};
