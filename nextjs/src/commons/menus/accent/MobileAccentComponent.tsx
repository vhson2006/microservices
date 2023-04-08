import {
  Menu,
  Link,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextLink from "next/link";

export const MobileAccentComponent = () => {
  const { t, lang } = useTranslation("common");

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Image src="/logo.png" height="8" alt="Yugioh" />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} href={lang === "en" ? `/${lang}` : "/"}>
          {t("menu#home")}
        </MenuItem>
        <MenuItem as={Link} href={lang === "en" ? `/${lang}/news` : "/news"}>
          {t("menu#news")}
        </MenuItem>
        <MenuItem as={Link} href={lang === "en" ? `/${lang}/shop` : "/shop"}>
          {t("menu#shop")}
        </MenuItem>
        <MenuItem as={Link} href={lang === "en" ? `/${lang}/cart` : "/cart"}>
          {t("menu#cart")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
