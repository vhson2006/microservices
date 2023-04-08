import {
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
  Stack,
  HStack,
  Square,
  Icon,
  Button,
  Center,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";
import { FiFileText } from "react-icons/fi";
import { PaginationButton } from "../../commons/paginations/PaginationButton";

export const PackagesGrid = (props: any) => {
  const { packageList, page, totalPage, gotoPage } = props;
  const { t, lang } = useTranslation("common");

  return (
    <SimpleGrid columns={{ base: 1 }} gap="6">
      <Box
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
        borderRadius="lg"
        p={{ base: "4", md: "6" }}
      >
        <Stack spacing="5">
          {packageList.map((order: any, idx: number) => (
            <Box
              key={idx}
              borderWidth={{ base: "0", md: "1px" }}
              p={{ base: "0", md: "4" }}
              borderRadius="lg"
            >
              <Stack
                justify="space-between"
                direction={{ base: "column", md: "row" }}
                spacing="5"
              >
                <HStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    <Icon as={FiFileText} boxSize="5" />
                  </Square>
                  <Box fontSize="sm">
                    <Text color="empahsized" fontWeight="medium">
                      {order.name}
                    </Text>
                    <Text>{order.address}</Text>
                    <Text>{order.phone}</Text>
                    <Text>{order.total}</Text>
                  </Box>
                </HStack>
                <Stack
                  spacing="3"
                  direction={{ base: "column-reverse", md: "row" }}
                >
                  <NextLink
                    href={
                      lang === "vi"
                        ? `/dashboard/package/${order.packageId}`
                        : `/${lang}/dashboard/package/${order.packageId}`
                    }
                    passHref
                  >
                    <Button variant="primary" as="a">
                      {t("common#button#view-package")}
                    </Button>
                  </NextLink>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
        <Center px={{ base: "4", md: "6" }} pt="5">
          <PaginationButton
            page={page}
            totalPage={totalPage}
            gotoPage={gotoPage}
          />
        </Center>
      </Box>
    </SimpleGrid>
  );
};
