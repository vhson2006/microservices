import useTranslation from "next-translate/useTranslation";
import Router from "next/router";
export const PrivateAccess = (props: any) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const { lang } = useTranslation("common");

  if (!isAuthenticated) {
    Router.push(lang === "vi" ? "/" : `/${lang}`);
  }

  return <>{children}</>;
};

export default PrivateAccess;
