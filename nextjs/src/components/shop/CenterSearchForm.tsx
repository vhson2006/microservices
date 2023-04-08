import { Stack, Input, Button, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

export const CenterSearchForm = (props: any) => {
  const { searchHandler } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(searchHandler)} style={{ width: 800 }}>
      <Stack spacing={12} direction={{ base: "column", md: "row" }} w={"full"}>
        <Input
          {...register("search", { required: false })}
          type={"text"}
          placeholder={t("common#button#search")}
          color={useColorModeValue("gray.800", "gray.200")}
          bg={useColorModeValue("gray.100", "gray.600")}
          rounded={"full"}
          border={0}
          _focus={{
            bg: useColorModeValue("gray.200", "gray.800"),
            outline: "none",
          }}
        />
        <Button variant="primary" rounded={"full"} type="submit">
          {t("common#button#search")}
        </Button>
      </Stack>
    </form>
  );
};
