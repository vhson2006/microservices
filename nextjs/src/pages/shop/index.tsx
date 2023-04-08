import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "../../redux/wrapper";
import { triggerProductList } from "../../stores/products";
import { ErrorMessage } from "../../commons/messages/ErrorMessage";
import { PublicAccess } from "../../modules";
import { Box, Center, Container, Flex } from "@chakra-ui/react";
import nProgress from "nprogress";
import { PageHeader, SeoHead } from "../../commons/headers";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import { ShopPaginationContainer } from "../../containers/shop/ShopPaginationContainer";
import { CenterSearchContainer } from "../../containers/shop/CenterSearchContainer";
import { ShopGridContainer } from "../../containers/shop/ShopGridContainer";

const ShopPage = (props: any) => {
  const { isServer } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { data, error, loading } = useSelector(({ products }: any) => products);

  useEffect(() => {
    loading ? nProgress.start() : nProgress.done();
  }, [loading]);

  useEffect(() => {
    if (!isServer) {
      dispatch(
        triggerProductList({
          search: "",
          page: 1,
          size: 20,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  return (
    <PublicAccess>
      <SeoHead
        title={t("seo#shops#title")}
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
          <Container flex="1">
            <Box maxW="6xl" mx="auto" my="5">
              <PageHeader title={t("seo#shops#title")} description="" />
              <Center>
                <CenterSearchContainer />
              </Center>
              <ShopGridContainer />
              <Center>
                <ShopPaginationContainer />
              </Center>
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
        store.dispatch(
          triggerProductList({
            search: "",
            page: 1,
            size: 20,
          })
        );
        store.dispatch(END);
        await store.sagaTask.toPromise();
      }
      return {
        props: {
          isServer,
          title: "title#shop_page",
        },
      };
    }
);

export default ShopPage;
