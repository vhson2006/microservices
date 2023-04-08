import { Text, Button } from "@chakra-ui/react";

export const EnglishLanguage = (props: any) => {
  const { changeLanguage } = props;
  return (
    <>
      <Button variant="ghost-on-accent" onClick={() => changeLanguage("vi")}>
        VI
      </Button>
      <Text
        as="span"
        fontWeight="bold"
        color="white"
        textDecoration="underline"
        p={1}
      >
        EN
      </Text>
    </>
  );
};
