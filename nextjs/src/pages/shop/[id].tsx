import { END } from "redux-saga";
import { PageHeader, SeoHead } from "../../commons/headers";
import { PublicAccess } from "../../modules";
import { wrapper } from "../../redux/wrapper";
import { Box, Stack, Center, Container, Flex } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import { ReviewSummary } from "../../components/shop/ReviewSummary";

const ShopDetailPage = (props: any) => {
  const { isServer } = props;
  const { t } = useTranslation("common");

  return (
    <PublicAccess>
      <SeoHead title={t("seo#shop#title")} description={t("seo#description")} />
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
          <Container flex="1">
            <Box maxW="6xl" mx="auto" my="5">
              <Stack
                spacing={{ base: "12", md: "16" }}
                textAlign="center"
                align="center"
              >
                <Center>
                  <PageHeader title={t("shop#title")} description="" />
                </Center>
                <ReviewSummary />
              </Stack>
            </Box>
          </Container>
        </Flex>
        <AccentFooterContainer />
      </Flex>
    </PublicAccess>
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

export default ShopDetailPage;
