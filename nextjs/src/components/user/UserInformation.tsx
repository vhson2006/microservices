import {
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const UserInformationForm = (props: any) => {
  const { data, updateProfile } = props;
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(updateProfile)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <FormControl id="name">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">{t("user#name")}</FormLabel>
            <Input
              maxW={{ md: "3xl" }}
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </Stack>
        </FormControl>
        <FormControl id="email">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">{t("user#email")}</FormLabel>
            <Input
              type="email"
              maxW={{ md: "3xl" }}
              id="email"
              disabled
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </Stack>
        </FormControl>
        <FormControl id="phone">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">{t("user#phone")}</FormLabel>
            <Input
              type="text"
              maxW={{ md: "3xl" }}
              id="phone"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </Stack>
        </FormControl>
        <FormControl id="address">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "1.5", md: "8" }}
            justify="space-between"
          >
            <FormLabel variant="inline">{t("user#address")}</FormLabel>
            <Input
              type="text"
              maxW={{ md: "3xl" }}
              id="address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </Stack>
        </FormControl>
        <Flex direction="row-reverse">
          <Button variant="primary" type="submit">
            {t("common#button#update")}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
