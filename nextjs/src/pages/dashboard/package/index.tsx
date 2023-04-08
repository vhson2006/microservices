import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  Container,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { triggerPackages } from "../../../stores/packages";
import { PrivateAccess } from "../../../modules";
import { wrapper } from "../../../redux/wrapper";
import useTranslation from "next-translate/useTranslation";
import { SeoHead } from "../../../commons/headers";
import { PackagesGridContainer } from "../../../containers/dashboard/PackagesGridContainer";
import { END } from "redux-saga";
import { DashboardMenuComponent } from "../../../commons/menus/dasboard/DashboardMenuComponent";
import { DashboardSidebar } from "../../../commons/menus/dasboard/DashboardSidebar";

const PackagesPage = (props: any) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { isServer } = props;

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    if (!isServer) {
      dispatch(triggerPackages({ search: "", page: 1 }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  {t("dashboard#packages#title")}
                </Heading>
                <Text color="muted">{t("dashboard#packages#description")}</Text>
              </Stack>
            </Stack>
            <PackagesGridContainer />
          </Stack>
        </Container>
      </Flex>
    </PrivateAccess>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }: any) => {
      const isServer = !req.url.startsWith("/_next");
      if (isServer) {
        store.dispatch(END);
        await store.sagaTask.toPromise();
      }
      return {
        props: {
          isServer: false,
        },
      };
    }
);

export default PackagesPage;
