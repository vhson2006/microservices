import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { SeoHead } from "../../../commons/headers";
import { ErrorMessage } from "../../../commons/messages/ErrorMessage";
import { PrivateAccess } from "../../../modules";
import { wrapper } from "../../../redux/wrapper";
import { triggerUserInfo } from "../../../stores/user";
import { UserInformationFormContainer } from "../../../containers/user/UserInformationFormContainer";
import { DashboardMenuComponent } from "../../../commons/menus/dasboard/DashboardMenuComponent";
import { DashboardSidebar } from "../../../commons/menus/dasboard/DashboardSidebar";

const UserPage = (props: any) => {
  const { isServer } = props;
  const { data, error } = useSelector(({ user }: any) => user);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    if (!isServer) {
      dispatch(triggerUserInfo());
    }
  }, []);

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  return (
    <PrivateAccess>
      <SeoHead title={t("seo#user#title")} description={t("seo#description")} />
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
                  {t("user#title")}
                </Heading>
              </Stack>
            </Stack>
            <Box maxW="6xl" mx="auto" my="auto">
              <Stack spacing="5">
                <UserInformationFormContainer />
              </Stack>
            </Box>
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
export default UserPage;
