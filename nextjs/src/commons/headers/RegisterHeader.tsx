import { Stack, Heading, HStack, Button, Link, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Logo } from "../icons";

export const RegisterHeader = (props: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <Stack spacing="6" align="center">
      <Logo />
      <Stack spacing="3" textAlign="center">
        <Heading size="xs">{t("common#button#register")}</Heading>
        <HStack justify="center" spacing="1">
          <Text color="muted">{t("common#header#already")}</Text>
          <Button variant="link" colorScheme="blue">
            <Link href={lang === "vi" ? "/auth/login" : `/${lang}/auth/login`}>
              {t("common#header#login")}
            </Link>
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
