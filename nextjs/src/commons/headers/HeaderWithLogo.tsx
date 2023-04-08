import {
  Stack,
  Heading,
  useBreakpointValue,
  HStack,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { Logo } from "../icons";

export const HeaderWithLogo = (props: any) => {
  const { t, lang } = useTranslation("common");
  const { title } = props;

  return (
    <Stack spacing="6">
      <Logo />
      <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
        <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
          {title}
        </Heading>
        <HStack spacing="1" justify="center">
          <Text color="muted">{t("common#header#not-register")}</Text>
          <Button variant="link" colorScheme="blue">
            <Link
              href={lang === "vi" ? "/auth/register" : `/${lang}/auth/register`}
            >
              {t("common#header#register")}
            </Link>
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
