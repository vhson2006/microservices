import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const ForgotPasswordForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendRecoveryEmail } = props;
  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(sendRecoveryEmail)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="email">{t("common#input#email")}</FormLabel>
            <Input
              id="email"
              type="email"
              {...register("email", { minLength: 4 })}
            />
            <FormHelperText color="muted">
              {t("forgot-password#form#email-hint")}
            </FormHelperText>
            {errors.email && (
              <Text as="em" color="red">
                {t("error#validate#min-length-4")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("common#button#send-request")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
