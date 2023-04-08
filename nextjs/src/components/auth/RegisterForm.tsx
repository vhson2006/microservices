import {
  Stack,
  Button,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const RegisterForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = props;
  const { t, lang } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="name">{t("common#input#name")}</FormLabel>
            <Input
              id="name"
              type="text"
              {...register("name", { minLength: 4 })}
            />
            {errors.name && (
              <Text as="em" color="red">
                {t("error#validate#min-length-4")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">{t("common#input#email")}</FormLabel>
            <Input
              id="email"
              type="email"
              {...register("email", { minLength: 4 })}
            />
            {errors.email && (
              <Text as="em" color="red">
                {t("error#validate#min-length-4")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">
              {t("common#input#password")}
            </FormLabel>
            <Input
              id="password"
              type="password"
              {...register("password", { minLength: 8 })}
            />
            <FormHelperText color="muted">
              {t("error#validate#min-length-8")}
            </FormHelperText>
            {errors.password && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="confirm-password">
              {t("common#input#retype-password")}
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              {...register("confirmPassword", { minLength: 8 })}
            />
            {errors.confirmPassword && (
              <Text as="em" color="red">
                {t("error#validate")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phone"> {t("common#input#phone")}</FormLabel>
            <Input
              id="phone"
              type="tel"
              {...register("phone", { minLength: 10 })}
            />
            {errors.phone && (
              <Text as="em" color="red">
                {t("error#validate#min-length-10")}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="address">
              {" "}
              {t("common#input#address")}
            </FormLabel>
            <Input
              id="address"
              type="text"
              {...register("address", { minLength: 8 })}
            />
            {errors.address && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("common#button#register")}
          </Button>
          {/* <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
              or sign up with
            </Text>
            <Divider />
          </HStack>
          <OAuthButtonGroup /> */}
        </Stack>
      </Stack>
    </form>
  );
};
