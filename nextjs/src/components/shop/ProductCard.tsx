import {
  Box,
  HStack,
  Image,
  Skeleton,
  Stack,
  Tag,
  Text,
  Link,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { BuyButton } from "./BuyButton";
import { PriceTag } from "./PriceTag";
import { Rating } from "./Rating";

export const ProductCard = (props: any) => {
  const { product, addToCart } = props;
  const { t, lang } = useTranslation("common");

  return (
    <Stack spacing={{ base: "3", md: "5" }}>
      <Box position="relative">
        <Image
          src={product.image}
          alt={product.name}
          draggable="false"
          fallback={<Skeleton />}
        />
        {/* <BuyButton
          onClick={(e) => addToCart(product.id)}
          position="absolute"
          top="3"
          right="3"
          aria-label={`Add ${product.name} to your favourites`}
        /> */}
        <HStack spacing="3" position="absolute" bottom="3" left="3">
          {[
            {
              name: "Exclusive 💫",
              color: "purple",
            },
            {
              name: "New ✨",
              color: "green",
            },
          ]?.map((tag: any) => (
            <Tag
              key={tag.name}
              bg={`${tag.color}.500`}
              color="white"
              fontWeight="semibold"
            >
              {tag.name}
            </Tag>
          ))}
        </HStack>
      </Box>
      <Button onClick={(e) => addToCart(product.id)} variant="primary">
        {t("common#button#add")}
      </Button>
      <Stack>
        <Stack spacing="0.25">
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
            <Link
              href={
                lang === "vi"
                  ? `/shop/${product.userId}`
                  : `/${lang}/shop/${product.userId}`
              }
            >
              {t("shops#details#seller") + product.userName}
            </Link>
          </Text>
          <Text fontWeight="medium">
            <Link
              href={
                lang === "vi"
                  ? `/product/${product.cardId}`
                  : `/${lang}/product/${product.cardId}`
              }
            >
              {t("shops#details#name") + product.name}
            </Link>
          </Text>
          <Text>{t("shops#details#rarity") + product.rarity}</Text>
          <Text fontWeight="sm">{t("shops#details#code") + product.code}</Text>
        </Stack>
        <PriceTag
          currency="VND"
          price={product.price}
          priceProps={{ color: useColorModeValue("gray.800", "gray.200") }}
          salePrice={product.price}
          salePriceProps={{
            color: useColorModeValue("red.500", "red.400"),
            fontWeight: "bold",
          }}
        />
        <HStack>
          <Rating defaultValue={product.rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            12 {t("shops#details#reviews")}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};
