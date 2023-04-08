import {
  Flex,
  Container,
  Stack,
  Heading,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { SeoHead } from "../../../commons/headers";
import { DashboardMenuComponent } from "../../../commons/menus/dasboard/DashboardMenuComponent";
import { DashboardSidebar } from "../../../commons/menus/dasboard/DashboardSidebar";
import { PrivateAccess } from "../../../modules";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

const EditorInput = dynamic(() => import("../../../commons/inputs/editors"), {
  ssr: false,
});

const NewsManagement = (props: any) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { t } = useTranslation("common");

  // if (localStorage.getItem("user") !== "vhson2006@gmail.com") return <></>;

  return (
    <PrivateAccess>
      <SeoHead
        title={t("seo#dashboard#title")}
        description={t("seo#description")}
      />
      <Flex
        as="section"
        direction={{ base: "column", lg: "row" }}
        height="100vh"
        bg="bg-canvas"
        overflowY="auto"
      >
        {isDesktop ? <DashboardSidebar /> : <DashboardMenuComponent />}
        <Container py="8" flex="1">
          <Stack spacing={{ base: "8", lg: "6" }}>
            <Stack
              spacing="4"
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align={{ base: "start", lg: "center" }}
            >
              <Stack spacing="1">
                <Heading size={{ base: "xs", lg: "sm" }} fontWeight="medium">
                  {t("dashboard#news#title")}
                </Heading>
                <Text color="muted">{t("dashboard#news#description")}</Text>
              </Stack>
            </Stack>
            <EditorInput />
          </Stack>
        </Container>
      </Flex>
    </PrivateAccess>
  );
};

export default NewsManagement;
