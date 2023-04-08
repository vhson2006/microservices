import { useToast } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
import { common } from "../../configs/consts";
import { register } from "../../utils/api";
import { RegisterForm } from "../../components/auth/RegisterForm";

export const RegisterFormContainer = () => {
  const { t, lang } = useTranslation("common");

  const toast = useToast();
  const registerUser = async (data: any) => {
    const { confirmPassword, ...bodyObj } = data;
    const response = await register(bodyObj);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("registration#request#message#title"),
        description: t("registration#request#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("registration#request#message#title"),
        description: t("registration#request#message#success"),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Router.push(lang === "vi" ? "/auth/login" : `/${lang}/auth/login`);
    }
  };

  return <RegisterForm registerUser={registerUser} />;
};
