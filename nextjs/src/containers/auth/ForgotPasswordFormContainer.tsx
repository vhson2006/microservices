import { useToast } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { common } from "../../configs/consts";
import { requestRecoveryEmail } from "../../utils/api";
import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm";

export const ForgotPasswordFormContainer = (props: any) => {
  const toast = useToast();
  const { t, lang } = useTranslation("common");

  const sendRecoveryEmail = async (data: any) => {
    const response = await requestRecoveryEmail(data);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("forgot-password#send-request#message#title"),
        description: t("forgot-password#send-request#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("forgot-password#send-request#message#title"),
        description: t("forgot-password#send-request#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Router.push(lang === "vi" ? "/auth/login" : `/${lang}/auth/login`);
    }
  };

  return <ForgotPasswordForm sendRecoveryEmail={sendRecoveryEmail} />;
};
