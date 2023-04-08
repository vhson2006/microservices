import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import { ErrorMessage } from "../../commons/messages/ErrorMessage";
import { triggerNews } from "../../stores/news";
import { wrapper } from "../../redux/wrapper";
import { PageProps } from "../../typescripts/common";
import { PublicAccess } from "../../modules";
import { PageHeader, SeoHead } from "../../commons/headers";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import { NewsGrid } from "../../components/news/NewsGrid";

const NewsPage = (props: PageProps) => {
  const { isServer } = props;
  const { data, error } = useSelector(({ news }: any) => news);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!isServer) {
      dispatch(
        triggerNews({
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
      <SeoHead title={t("seo#news#title")} description={t("seo#description")} />
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
              <Stack spacing="10" shouldWrapChildren>
                <PageHeader title={t("news#title")} description="" />
                <NewsGrid data={data} />
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
    async ({ req }: any) => {
      const isServer = !req.url.startsWith("/_next");

      if (isServer) {
        store.dispatch(
          triggerNews({
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
        },
      };
    }
);

export default NewsPage;
