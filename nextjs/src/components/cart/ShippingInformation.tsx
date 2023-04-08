import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const ShippingInformation = (props: any) => {
  const { createOrder } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(createOrder)}>
      <Stack spacing={{ base: "6", md: "8" }}>
        <FormControl isRequired>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            {t("common#input#receiver-name")}
          </FormLabel>
          <Input
            id="name"
            placeholder=""
            {...register("name", { required: true })}
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          />
          {errors.name && (
            <Text as="em" color="red">
              {t("error#validate")}
            </Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            {t("common#input#receiver-address")}
          </FormLabel>
          <Input
            id="address"
            {...register("address", { minLength: 8 })}
            placeholder=""
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          />
          {errors.address && (
            <Text as="em" color="red">
              {t("error#validate#min-length-8")}
            </Text>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            {t("common#input#receiver-phone")}
          </FormLabel>
          <Input
            id="phone"
            {...register("phone", { minLength: 8 })}
            placeholder=""
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          />
          {errors.phone && (
            <Text as="em" color="red">
              {t("error#validate#min-length-8")}
            </Text>
          )}
        </FormControl>
        <Button
          variant="solid"
          // bg={'purple.400'}
          // _hover={{ bg: 'purple.500' }}
          // _focus={{ bg: 'purple.500' }}
          // // colorScheme="blue"
          // size="lg"
          // fontSize="md"
          type="submit"
        >
          {t("common#button#order")}
        </Button>
      </Stack>
    </form>
  );
};
