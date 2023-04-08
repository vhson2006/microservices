import { useSelector } from "react-redux";
import { ErrorMessage } from "../../commons/messages/ErrorMessage";
import { PublicAccess } from "../../modules";
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { PageHeader, SeoHead } from "../../commons/headers";
import { ShippingInformationContainer } from "../../containers/cart/ShippingInformationContainer";
import { ProductItemContainer } from "../../containers/cart/ProductItemContainer";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import { END } from "redux-saga";
import { wrapper } from "../../redux/wrapper";

const CartPage = (props: any) => {
  const { t } = useTranslation("common");

  const { data, error } = useSelector(({ cart }: any) => cart);

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  return (
    <PublicAccess>
      <SeoHead title={t("seo#cart#title")} description={t("seo#description")} />
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
              <PageHeader title={t("cart#title")} description="" />
              <Box
                bgGradient={useColorModeValue(
                  "linear(to-l, gray.50 50%, white 50%)",
                  "linear(to-l, gray.700 50%, gray.800 50%)"
                )}
                bg="bg-surface"
                boxShadow={useColorModeValue("sm", "sm-dark")}
                borderRadius="lg"
                m={5}
              >
                <Flex
                  maxW="10xl"
                  mx="auto"
                  direction={{ base: "column", md: "row" }}
                >
                  <ShippingInformationContainer />
                  <ProductItemContainer />
                </Flex>
              </Box>
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
export default CartPage;
