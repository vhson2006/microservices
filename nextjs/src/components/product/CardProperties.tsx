import { List, ListItem, Text } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

export const CardProperties = (props: any) => {
  const { data } = props;
  const { t } = useTranslation("common");

  return (
    <List spacing={2}>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#attribute")}
        </Text>{" "}
        {data.attribute}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#level")}
        </Text>{" "}
        {data.level}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#type")}
        </Text>{" "}
        {data.type}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#attack")}
        </Text>{" "}
        {data.atk}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#defense")}
        </Text>{" "}
        {data.def}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#box")}
        </Text>{" "}
        {data.boxName}
      </ListItem>
      <ListItem>
        <Text as={"span"} fontWeight={"bold"}>
          {t("product#details#release-date")}
        </Text>{" "}
        {data.releaseDate}
      </ListItem>
    </List>
  );
};
