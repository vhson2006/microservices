import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const ResetPasswordForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resetPassword } = props;
  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="new-password">
              {t("common#input#new-password")}
            </FormLabel>
            <Input
              id="new-password"
              type="password"
              {...register("newPassword", { minLength: 8 })}
            />
            {errors.newPassword && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="retype-new-password">
              {t("common#input#retype-new-password")}
            </FormLabel>
            <Input
              id="retype-new-password"
              type="password"
              {...register("retypeNewPassword", { minLength: 8 })}
            />
            {errors.retypeNewPassword && (
              <Text as="em" color="red">
                {t("error#validate#min-length-8")}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button variant="primary" type="submit">
            {t("common#button#reset-password")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
