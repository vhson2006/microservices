import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  Stack,
  Center,
  useToast,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { PaginationButton } from "../../commons/paginations/PaginationButton";
import { AlignSearchForm } from "../../components/dashboard/AlignSearchForm";
import { common } from "../../configs/consts";
import { triggerOwnProductList } from "../../stores/own-products";
import { deleteOwnProduct } from "../../utils/api";
import { MemberTable } from "../../components/dashboard/MemberTable";

export const MemberTableContainer = (props: any) => {
  const { onOpenAdd, editUserProduct } = props;
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    data: ownProductList,
    search,
    page,
    totalPage,
  } = useSelector(({ ownProducts }: any) => ownProducts);
  const { t } = useTranslation("common");
  const deleteUserProduct = async (id: string) => {
    const response = await deleteOwnProduct(id);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("dashboard#delete#message#title"),
        description: t("dashboard#delete#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("dashboard#delete#message#title"),
        description: t("dashboard#delete#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(triggerOwnProductList({ search: search, page: page }));
    }
  };

  const gotoPage = (page: number) => {
    dispatch(triggerOwnProductList({ search: search, page: page }));
  };

  const searchHandler = (data: any) => {
    const { search } = data;
    dispatch(triggerOwnProductList({ search: search, page: 1 }));
  };

  return (
    <Box
      bg="bg-surface"
      boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
      borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
    >
      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <AlignSearchForm
            searchHandler={searchHandler}
            addUserProduct={onOpenAdd}
          />
        </Box>
        <Box overflowX="auto">
          <MemberTable
            data={ownProductList}
            deleteUserProduct={deleteUserProduct}
            editUserProduct={editUserProduct}
          />
        </Box>
        <Center px={{ base: "4", md: "6" }} pb="5">
          <PaginationButton
            page={page}
            totalPage={totalPage}
            gotoPage={gotoPage}
          />
        </Center>
      </Stack>
    </Box>
  );
};
