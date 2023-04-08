import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../../commons/messages/ErrorMessage";
import { triggerDetailPackage } from "../../../stores/detail-package";
import { PrivateAccess } from "../../../modules";
import {
  Container,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { SeoHead } from "../../../commons/headers";
import { PackageItemListContainer } from "../../../containers/dashboard/PackageItemListContainer";
import { PackageSummaryContainer } from "../../../containers/dashboard/PackageSummaryContainer";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/wrapper";
import useTranslation from "next-translate/useTranslation";
import { DashboardMenuComponent } from "../../../commons/menus/dasboard/DashboardMenuComponent";
import { DashboardSidebar } from "../../../commons/menus/dasboard/DashboardSidebar";

const PackageDetail = (props: any) => {
  const { t } = useTranslation("common");
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isServer } = props;
  const { data, error } = useSelector(
    ({ detailPackage }: any) => detailPackage
  );
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isServer) {
      dispatch(triggerDetailPackage(id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorMessage message={error.message} />;
  // if (!data) return null;

  return (
    <PrivateAccess>
      <SeoHead
        title={t("seo#package#title")}
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
            <Stack spacing={{ base: "8", md: "12" }} pt="50">
              <PackageItemListContainer />
              <PackageSummaryContainer />
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </PrivateAccess>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params, query }: any) => {
      const isServer = !req.url.startsWith("/_next");
      const { id } = params;
      if (isServer) {
        store.dispatch(END);
        await store.sagaTask.toPromise();
      }
      return {
        props: {
          isServer,
        },
      };
    }
);

export default PackageDetail;
