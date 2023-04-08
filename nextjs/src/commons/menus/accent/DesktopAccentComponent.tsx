import { ButtonGroup, Button, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export const DesktopAccentComponent = () => {
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();

  return (
    <>
      <Image src="/logo.png" height="8" alt="Yugioh" />
      <ButtonGroup variant="ghost-on-accent" spacing="1">
        <NextLink href={lang === "en" ? `/${lang}` : "/"} passHref>
          <Button aria-current={asPath === "/" ? "page" : undefined}>
            {t("menu#home")}
          </Button>
        </NextLink>
        <NextLink href={lang === "en" ? `/${lang}/news` : "/news"} passHref>
          <Button aria-current={asPath === "/news" ? "page" : undefined}>
            {t("menu#news")}
          </Button>
        </NextLink>
        <NextLink href={lang === "en" ? `/${lang}/shop` : "/shop"} passHref>
          <Button aria-current={asPath === "/shop" ? "page" : undefined}>
            {t("menu#shop")}
          </Button>
        </NextLink>
        <NextLink href={lang === "en" ? `/${lang}/cart` : "/cart"} passHref>
          <Button aria-current={asPath === "/cart" ? "page" : undefined}>
            {t("menu#cart")}
          </Button>
        </NextLink>
      </ButtonGroup>
    </>
  );
};
