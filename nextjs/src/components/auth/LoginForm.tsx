import {
  Link,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const LoginForm = (props: any) => {
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
            {errors.password && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <HStack justify="space-between">
          <Button variant="link" colorScheme="blue" size="sm">
            <Link
              href={
                lang === "vi"
                  ? "/auth/forgot-password"
                  : `/${lang}/auth/forgot-password`
              }
            >
              {t("login#link#forgot-password")}
            </Link>
          </Button>
        </HStack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("common#button#login")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
