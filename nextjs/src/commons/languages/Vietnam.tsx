import { Text, Button } from "@chakra-ui/react";

export const VietnamLanguage = (props: any) => {
  const { changeLanguage } = props;
  return (
    <>
      <Text
        as="span"
        fontWeight="bold"
        color="white"
        textDecoration="underline"
        p={1}
      >
        VI
      </Text>
      <Button variant="ghost-on-accent" onClick={() => changeLanguage("en")}>
        EN
      </Button>
    </>
  );
};
