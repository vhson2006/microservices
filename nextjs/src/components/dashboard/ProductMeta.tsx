import {
  AspectRatio,
  Badge,
  Box,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { HiCheckCircle } from "react-icons/hi";

export const ProductMeta = (props: any) => {
  const { isBestSeller, image, quantity, title, variants, isInStock } = props;
  const { t } = useTranslation("common");

  return (
    <Stack direction="row" spacing={{ base: "3", md: "5" }} width="full">
      <AspectRatio ratio={6 / 9} width="92px">
        <Image
          fit="cover"
          src={image}
          alt={title}
          draggable="false"
          loading="lazy"
          width="full"
          height="full"
        />
      </AspectRatio>
      <Box pt="2">
        <Stack fontSize="sm" align="flex-start">
          <Text fontWeight="semibold" lineHeight="1" noOfLines={1}>
            {title}
          </Text>
          <Text>{t("package#quantity#label") + quantity}</Text>
          {variants && (
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              lineHeight="1"
            >
              {variants.map((item: any) => item.value).join(", ")}
            </Text>
          )}
          {isBestSeller && (
            <Badge variant="solid" colorScheme="orange" fontSize="x-small">
              {t("package#best-seller#label")}
            </Badge>
          )}
          {isInStock && (
            <HStack
              spacing="1"
              color={useColorModeValue("green.600", "green.400")}
            >
              <Icon as={HiCheckCircle} fontSize="md" />
              <p>{t("package#stock#label")}</p>
            </HStack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
