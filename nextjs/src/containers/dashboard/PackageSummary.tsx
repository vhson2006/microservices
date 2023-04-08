import { Flex, Stack, Text, useColorModeValue, Button } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { OrderSummaryItemProps } from "../../typescripts/common";
import { formatPrice } from "../../helpers/prices";

const SummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text
        fontWeight="medium"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const PackageSummary = (props: any) => {
  const { phone, address, total, name, deletePackage, completePackage } = props;
  const { t } = useTranslation("common");

  return (
    <Stack spacing="6" width="full" maxW="sm">
      <Stack
        spacing="6"
        bg={useColorModeValue("gray.50", "gray.700")}
        rounded="lg"
      >
        <Text fontSize="lg" fontWeight="bold">
          {t("package#summary#title")}
        </Text>

        <Stack spacing="4">
          <SummaryItem label={t("package#name#label")} value={name} />
          <SummaryItem label={t("package#address#label")} value={address} />
          <SummaryItem label={t("package#phone#label")} value={phone} />
          <SummaryItem
            label={t("package#cost#label")}
            value={formatPrice(total, { locale: "VI", currency: "VND" })}
          />
          <Flex justify="space-between" fontWeight="semibold">
            <Text>{t("package#summary#sum")}</Text>
            <Text>{formatPrice(total, { locale: "VI", currency: "VND" })}</Text>
          </Flex>
          <Button colorScheme="orange" onClick={deletePackage}>
            {t("common#button#cancel-order")}
          </Button>
          <Button colorScheme="purple" onClick={completePackage}>
            {t("common#button#done-order")}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
