import {
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

export const AddUserProductModal = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { isOpen, onClose, addUserProduct, loadOptions } = props;

  const handelChange = (name: any) => {
    setValue("name", name.value, { shouldValidate: true });
  };

  const { t } = useTranslation("common");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(addUserProduct)}>
          <ModalHeader>{t("dashboard#add#modal#title")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>{t("dashboard#add#modal#name")}</FormLabel>
              <AsyncSelect
                {...register("name", { required: true })}
                loadOptions={loadOptions}
                getOptionLabel={(e: any) => e.label}
                getOptionValue={(e: any) => e.value}
                defaultOptions
                onChange={handelChange}
                // onInputChange={handleInputChange}
                isSearchable={true}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{t("dashboard#add#modal#code")}</FormLabel>
              <Input
                id="code"
                {...register("code", { required: true })}
                placeholder=""
              />
              {errors.code && (
                <Text as="em" color="red">
                  {t("error#validate")}
                </Text>
              )}
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>{t("dashboard#add#modal#quantity")}</FormLabel>
              <Input
                id="quantity"
                {...register("quantity", { required: true })}
                placeholder=""
              />
              {errors.quantity && (
                <Text as="em" color="red">
                  {t("error#validate")}
                </Text>
              )}
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>{t("dashboard#add#modal#price")}</FormLabel>
              <Input
                id="price"
                {...register("price", { required: true })}
                placeholder=""
              />
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
