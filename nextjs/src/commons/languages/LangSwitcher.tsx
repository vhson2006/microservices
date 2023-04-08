import { useRouter } from "next/router";
import { EnglishLanguage, VietnamLanguage } from ".";
import useTranslation from "next-translate/useTranslation";

const LangSwitcher = (props: any) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { t, lang } = useTranslation("common");

  const changeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
  };
  return lang === "en" ? (
    <EnglishLanguage changeLanguage={changeLanguage} />
  ) : (
    <VietnamLanguage changeLanguage={changeLanguage} />
  );
};

export default LangSwitcher;
