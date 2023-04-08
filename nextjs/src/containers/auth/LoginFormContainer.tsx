import { useToast } from "@chakra-ui/react";
import { common } from "../../configs/consts";
import { login } from "../../utils/api";
import jwt from "jwt-decode";
import useTranslation from "next-translate/useTranslation";
import { LoginForm } from "../../components/auth/LoginForm";

export const LoginFormContainer = (props: any) => {
  const { t, lang } = useTranslation("common");
  const toast = useToast();
  const registerUser = async (data: any) => {
    const response = await login(data);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("login#auth#message#title"),
        description: t("login#auth#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      localStorage.setItem("token", response.data.token);
      const { email }: any = jwt(response.data.token);
      localStorage.setItem("user", email);
      window.location.assign(
        lang === "vi" ? "/dashboard" : `/${lang}/dashboard`
      );
    }
  };

  return <LoginForm registerUser={registerUser} />;
};
