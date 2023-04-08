import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const EditUserProductModal = (props: any) => {
  const { isOpen, onClose, editUserProduct, cardName, code, quantity, price } =
    props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset({ quantity: quantity, price: price });
  }, [quantity, price]);

  const { t } = useTranslation("common");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(editUserProduct)}>
          <ModalHeader>{t("dashboard#edit#modal#title")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{t("dashboard#edit#modal#name")}</FormLabel>
              <Input id="cardName" value={cardName} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>{t("dashboard#edit#modal#code")}</FormLabel>
              <Input id="code" value={code} disabled />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>{t("dashboard#edit#modal#quantity")}</FormLabel>
              <Input
                id="quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <Text as="em" color="red">
                  {t("error#validate")}
                </Text>
              )}
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>{t("dashboard#edit#modal#price")}</FormLabel>
              <Input id="price" {...register("price", { required: true })} />
              {errors.price && (
                <Text as="em" color="red">
                  {t("error#validate")}
                </Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" variant="primary" mr={3}>
              {t("common#button#save")}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              {t("common#button#cancel")}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
