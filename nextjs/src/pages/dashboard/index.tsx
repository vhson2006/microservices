import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  Container,
  Flex,
  Heading,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { triggerPackages } from "../../stores/packages";
import { triggerOwnProductList } from "../../stores/own-products";
import { PrivateAccess } from "../../modules";
import { wrapper } from "../../redux/wrapper";
import useTranslation from "next-translate/useTranslation";
import { SeoHead } from "../../commons/headers";
import { EditUserProductModalContainer } from "../../containers/dashboard/EditUserProductModalContainer";
import { MemberTableContainer } from "../../containers/dashboard/MemberTableContatiner";
import { AddUserProductModalContainer } from "../../containers/dashboard/AddUserProductModalContainer";
import { END } from "redux-saga";
import { DashboardMenuComponent } from "../../commons/menus/dasboard/DashboardMenuComponent";
import { DashboardSidebar } from "../../commons/menus/dasboard/DashboardSidebar";

const DashboardPage = (props: any) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { isServer } = props;
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [id, setId] = useState("");
  const [cardName, setCardName] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    if (!isServer) {
      dispatch(triggerPackages({ search: "", page: 1 }));
      dispatch(triggerOwnProductList({ search: "", page: 1 }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editUserProduct = (data: any) => {
    const { id: idProp, name, code, quantity, price } = data;
    setId(idProp);
    setCardName(name);
    setCode(code);
    setQuantity(quantity);
    setPrice(price);
    onOpenEdit();
  };

  return (
    <PrivateAccess>
      <SeoHead
        title={t("seo#dashboard#title")}
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
                  {t("dashboard#title")}
                </Heading>
                <Text color="muted">{t("dashboard#description")}</Text>
              </Stack>
            </Stack>
            <MemberTableContainer
              onOpenAdd={onOpenAdd}
              editUserProduct={editUserProduct}
            />
          </Stack>
        </Container>
      </Flex>

      <AddUserProductModalContainer isOpen={isOpenAdd} onClose={onCloseAdd} />

      <EditUserProductModalContainer
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        id={id}
        cardName={cardName}
        code={code}
        quantity={quantity}
        price={price}
      />
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

export default DashboardPage;
