import { useToast } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { AddUserProductModal } from "../../components/dashboard/AddUserProduct";
import { common } from "../../configs/consts";
import { triggerOwnProductList } from "../../stores/own-products";
import { addOwnProduct, getCardList } from "../../utils/api";

export const AddUserProductModalContainer = (props: any) => {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const dispatch = useDispatch();
  const { search, page, error } = useSelector(
    ({ ownProducts }: any) => ownProducts
  );
  const { t } = useTranslation("common");

  const addUserProduct = async (data: any) => {
    const response = await addOwnProduct(data);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("dashboard#add#message#title"),
        description: t("dashboard#add#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("dashboard#add#message#title"),
        description: t("dashboard#add#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(triggerOwnProductList({ search: search, page: page }));
    }
    onClose();
  };

  const loadOptions = async (inputValue: any) => {
    const response = await getCardList({
      search: inputValue,
      page: 1,
      size: 20,
    });
    const { status, data } = response;
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        return data.data?.map((e: any) => ({
          value: e.name,
          label: e.name + "   -   (" + e.language + ")",
        }));
      }
    }
    return [];
  };

  return (
    <AddUserProductModal
      isOpen={isOpen}
      onClose={onClose}
      addUserProduct={addUserProduct}
      loadOptions={loadOptions}
    />
  );
};
