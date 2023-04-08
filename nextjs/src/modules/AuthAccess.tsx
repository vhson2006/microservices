import useTranslation from "next-translate/useTranslation";
import Router from "next/router";

export const AuthAccess = (props: any) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const { lang } = useTranslation("common");

  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // useEffect(() => {
  //   try {
  //     setIsAuthenticated(localStorage.getItem('token') ? true : false)
  //   } catch (e) {}
  // }, [])

  if (isAuthenticated) {
    Router.push(lang === "vi" ? "/dashboard" : `/${lang}/dashboard`);
  }

  return <>{children}</>;
};

export default AuthAccess;
