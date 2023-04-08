import {
  Stack,
  Heading,
  HStack,
  Icon,
  Link,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { FaArrowRight } from "react-icons/fa";

export const DiscoverOptions = (props: any) => {
  const bgColor = useColorModeValue("red.50", "gray.700");
  const lineColor = useColorModeValue("red.500", "red.300");
  const { t, lang } = useTranslation("common");

  return (
    <Box
      width={{ lg: "sm" }}
      transform={{ base: "translateY(-50%)", lg: "none" }}
      bg={{ base: bgColor, lg: "transparent" }}
      mx={{ base: "6", md: "8", lg: "0" }}
      px={{ base: "6", md: "8", lg: "0" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack spacing={{ base: "8", lg: "10" }}>
        <Stack spacing={{ base: "2", lg: "4" }}>
          <Heading size="xl" color={lineColor}>
            {t("home#summary")}
          </Heading>
          <Heading size="md" fontWeight="normal">
            {t("home#content")}
          </Heading>
        </Stack>
        <HStack>
          <Link
            color={lineColor}
            href={lang === "vi" ? "/shop" : `/${lang}/shop`}
            fontWeight="bold"
            fontSize="lg"
          >
            {t("home#find-action")}
          </Link>
          <Icon color={lineColor} as={FaArrowRight} />
        </HStack>
        <HStack>
          <Link
            color={lineColor}
            href={lang === "vi" ? "/auth/login" : `/${lang}/auth/login`}
            fontWeight="bold"
            fontSize="lg"
          >
            {t("home#sell-action")}
          </Link>
          <Icon color={lineColor} as={FaArrowRight} />
        </HStack>
      </Stack>
    </Box>
  );
};
