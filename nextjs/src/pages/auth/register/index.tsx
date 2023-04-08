import { AuthAccess } from "../../../modules";
import { SeoHead, RegisterHeader } from "../../../commons/headers";
import { RegisterFormContainer } from "../../../containers/auth/RegisterFormContainer";
import { RegisterRightBanner } from "../../../components/auth/RegisterRightBanner";
import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../../containers/menu/AccentMenuContainer";
import { END } from "redux-saga";
import { wrapper } from "../../../redux/wrapper";

const RegisterPage = () => {
  const { t } = useTranslation("common");

  return (
    <AuthAccess>
      <SeoHead
        title={t("seo#registration#title")}
        description={t("seo#description")}
      />
      <Flex direction="column" flex="1">
        <AccentMenuContainer />
        <Box maxW="6xl" mx="auto" py={{ base: "12", md: "24" }}>
          <Stack direction="row" spacing="12">
            <Flex flex="1">
              <Container
                maxW="md"
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
                <Stack spacing="8">
                  <RegisterHeader />
                  <RegisterFormContainer />
                </Stack>
              </Container>
            </Flex>
            <Center
              flex="1"
              px={{ lg: "8" }}
              display={{ base: "none", lg: "flex" }}
            >
              <RegisterRightBanner />
            </Center>
          </Stack>
        </Box>
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
export default RegisterPage;
