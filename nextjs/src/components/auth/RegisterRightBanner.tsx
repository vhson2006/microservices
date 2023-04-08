import {
  VStack,
  Stack,
  Icon,
  Heading,
  Avatar,
  HStack,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { FaStar } from "react-icons/fa";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

export const RegisterRightBanner = (props: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <VStack spacing="8">
      <Stack direction="row" spacing="3">
        <Icon as={ImQuotesLeft} boxSize="8" mt="-4" />
        <Heading size="sm" fontWeight="medium" textAlign="center">
          {t("registration#right-banner#info")}
        </Heading>
        <Icon as={ImQuotesRight} boxSize="8" alignSelf="end" />
      </Stack>
      <VStack spacing="4">
        <Avatar
          size="lg"
          src="https://avatars.githubusercontent.com/u/20296626?v=4"
          name="Administrator"
        />
        <Stack textAlign="center" spacing="1">
          <Text fontSize="md" fontWeight="medium" color="muted">
            {t("registration#right-banner#name")}
          </Text>
          <Text fontWeight="medium" fontSize="sm" color="muted">
            {t("registration#right-banner#email")}
          </Text>
        </Stack>
        <HStack spacing="0.5">
          <Icon as={FaStar} fontSize={"md"} color={"blue.500"} />
        </HStack>
      </VStack>
    </VStack>
  );
};
