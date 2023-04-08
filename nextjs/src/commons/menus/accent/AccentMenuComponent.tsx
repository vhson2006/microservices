import {
  Box,
  Container,
  useBreakpointValue,
  Flex,
  HStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { MobileAccentComponent } from "./MobileAccentComponent";
import { DesktopAccentComponent } from "./DesktopAccentComponent";
import dynamic from "next/dynamic";

const LangSwitcher = dynamic(() => import("../../languages/LangSwitcher"), {
  ssr: false,
});

export const AccentMenuComponent = (props: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { logout } = props;
  const { t, lang } = useTranslation("common");

  return (
    <Box as="nav" bg="bg-accent">
      <Container py={{ base: "3", lg: "4" }}>
        <Flex justify="space-between">
          <HStack spacing="4">
            {isDesktop ? <DesktopAccentComponent /> : <MobileAccentComponent />}
          </HStack>
          <HStack spacing="4">
            <LangSwitcher />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
