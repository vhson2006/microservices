import { useToast } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { EditUserProductModal } from "../../components/dashboard/EditUserProduct";
import { common } from "../../configs/consts";
import { triggerOwnProductList } from "../../stores/own-products";
import { editOwnProduct } from "../../utils/api";

export const EditUserProductModalContainer = (props: any) => {
  const {
    isOpen,
    onClose,
    id: userProductId,
    cardName,
    code,
    quantity,
    price,
  } = props;
  const toast = useToast();
  const dispatch = useDispatch();
  const { search, page } = useSelector(({ ownProducts }: any) => ownProducts);
  const { t } = useTranslation("common");

  const editUserProduct = async (data: any) => {
    const response = await editOwnProduct(userProductId, data);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("dashboard#edit#message#title"),
        description: t("dashboard#edit#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("dashboard#edit#message#title"),
        description: t("dashboard#edit#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      dispatch(triggerOwnProductList({ search: search, page: page }));
    }

    onClose();
  };

  return (
    <EditUserProductModal
      isOpen={isOpen}
      onClose={onClose}
      editUserProduct={editUserProduct}
      cardName={cardName}
      code={code}
      quantity={quantity}
      price={price}
    />
  );
};
