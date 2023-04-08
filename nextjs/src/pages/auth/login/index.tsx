import useTranslation from "next-translate/useTranslation";
import { HeaderWithLogo, SeoHead } from "../../../commons/headers";
import { AuthAccess } from "../../../modules";
import { LoginFormContainer } from "../../../containers/auth/LoginFormContainer";
import {
  Flex,
  Container,
  Box,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { AccentFooterContainer } from "../../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../../containers/menu/AccentMenuContainer";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/wrapper";

const LoginPage = (props: any) => {
  const { t } = useTranslation("common");

  return (
    <AuthAccess>
      <SeoHead
        title={t("seo#login#title")}
        description={t("seo#description")}
      />
      <Flex direction="column" flex="1">
        <AccentMenuContainer />
        <Flex
          as="main"
          role="main"
          direction="column"
          flex="1"
          py="16"
          {...props}
        >
          <Container
            maxW="lg"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", sm: "8" }}
          >
            <Stack spacing="8">
              <HeaderWithLogo title={t("login#title")} />
              <Box
                py={{ base: "0", sm: "8" }}
                px={{ base: "4", sm: "10" }}
                bg={useBreakpointValue({
                  base: "transparent",
                  sm: "bg-surface",
                })}
                boxShadow={{
                  base: "none",
                  sm: useColorModeValue("md", "md-dark"),
                }}
                borderRadius={{ base: "none", sm: "xl" }}
              >
                <LoginFormContainer />
              </Box>
            </Stack>
          </Container>
        </Flex>
        <AccentFooterContainer />
      </Flex>
    </AuthAccess>
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
export default LoginPage;
