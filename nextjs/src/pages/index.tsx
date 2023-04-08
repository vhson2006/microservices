import { PublicAccess } from "../modules";
import { wrapper } from "../redux/wrapper";
import { Stack, Flex, Text, Box } from "@chakra-ui/react";
import { PageHeader, SeoHead } from "../commons/headers";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../containers/menu/AccentMenuContainer";
import { HomePreview } from "../components/home/HomePreview";
import { DiscoverOptions } from "../components/home/DiscoverOptions";

const HomePage = (props: any) => {
  const { isServer } = props;
  const { t } = useTranslation("common");

  return (
    <PublicAccess>
      <SeoHead title={t("seo#home#title")} description={t("seo#description")} />
      <Flex direction="column" flex="1">
        <AccentMenuContainer />
        <Box maxW="6xl" mx="auto" my="5">
          <PageHeader title={t("home#title")} description="" />

          <Text align="center" my="5" fontSize="xl">
            {t("home#information")}
          </Text>
          <Stack
            direction={{ base: "column-reverse", lg: "row" }}
            spacing={{ base: "0", lg: "20" }}
            py="25"
          >
            <DiscoverOptions />
            <HomePreview />
          </Stack>
        </Box>
        <AccentFooterContainer />
      </Flex>
    </PublicAccess>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }: any) => {
      const isServer = !req.url.startsWith("/_next");

      return {
        props: {
          isServer,
          title: "title#home_page",
        },
      };
    }
);
export default HomePage;
