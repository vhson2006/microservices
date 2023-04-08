import { useToast } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { common } from "../../configs/consts";
import { getResetToken, resetPassword } from "../../utils/api";
import { ResetPasswordForm } from "../../components/auth/ResetPasswordForm";

export const ResetPasswordFormContainer = (props: any) => {
  const router = useRouter();
  const toast = useToast();
  const [resetToken, setResetToken] = useState("");
  const { id } = router.query;
  const { t, lang } = useTranslation("common");

  useEffect(() => {
    const requestResetToken = async () => {
      const response = await getResetToken({ forgotPasswordToken: id });
      if (response.status === common.INCORRECT) {
        Router.push(lang === "vi" ? "/auth/login" : `/${lang}/auth/login`);
      } else {
        setResetToken(response.data.token);
      }
    };

    requestResetToken();
  }, []);

  const resetPasswordHandler = async (data: any) => {
    const { newPassword, retypeNewPassword } = data;
    if (newPassword === retypeNewPassword) {
      const response = await resetPassword({
        resetToken: resetToken,
        password: newPassword,
      });
      if (response.status === common.INCORRECT) {
        toast({
          title: t("reset-password#recover#message#title"),
          description: t("reset-password#recover#message#fail"),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: t("reset-password#recover#message#title"),
          description: t("reset-password#recover#message#success"),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Router.push(lang === "vi" ? "/auth/login" : `/${lang}/auth/login`);
      }
    } else {
      toast({
        title: t("reset-password#recover#message#title"),
        description: t("reset-password#recover#message#error"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return <ResetPasswordForm resetPassword={resetPasswordHandler} />;
};
