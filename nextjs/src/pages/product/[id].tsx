import {
  Image,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Heading,
  useColorModeValue,
  StackDivider,
  VStack,
  Container,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { SeoHead } from "../../commons/headers";
import { ErrorMessage } from "../../commons/messages/ErrorMessage";
import { PublicAccess } from "../../modules";
import { wrapper } from "../../redux/wrapper";
import { triggerProduct } from "../../stores/product";
import useTranslation from "next-translate/useTranslation";
import { AccentFooterContainer } from "../../containers/footer/AccentFooterContainer";
import { AccentMenuContainer } from "../../containers/menu/AccentMenuContainer";
import { CardPropertiesContainer } from "../../containers/product/CardPropertiesContainer";

const ProductDetail = (props: any) => {
  const { isServer } = props;
  const { data, error } = useSelector(({ product }: any) => product);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (!isServer) {
      dispatch(triggerProduct(id));
    }
  }, []);

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  return (
    <PublicAccess>
      <SeoHead title={data.name} description={t("seo#description")} />
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
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}
              >
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={data.image}
                  fit={"cover"}
                  align={"center"}
                  mx="auto"
                />
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={"header"}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                    >
                      {data.name}
                    </Heading>
                    <Text
                      color={useColorModeValue("gray.900", "gray.400")}
                      fontWeight={300}
                      fontSize={"2xl"}
                    >
                      {data.price}
                    </Text>
                  </Box>
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    }
                  >
                    <VStack spacing={{ base: 4, sm: 6 }}>
                      <Text
                        color={useColorModeValue("gray.500", "gray.400")}
                        fontSize={"2xl"}
                        fontWeight={"300"}
                      >
                        {parse(data.text)}
                      </Text>
                    </VStack>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        {t("product#information")}
                      </Text>
                      <CardPropertiesContainer />
                    </Box>
                  </Stack>
                </Stack>
              </SimpleGrid>
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
        store.dispatch(triggerProduct(id));
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

export default ProductDetail;
