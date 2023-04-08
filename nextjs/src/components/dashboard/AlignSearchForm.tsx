import {
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { FiPlus, FiSearch } from "react-icons/fi";

export const AlignSearchForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { searchHandler, addUserProduct } = props;
  const { t } = useTranslation("common");

  return (
    <form onSubmit={handleSubmit(searchHandler)}>
      <Stack direction={{ base: "column", md: "row" }} justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          {t("dashboard#own-product#title")}
          <IconButton
            icon={<FiPlus fontSize="1.25rem" />}
            variant="ghost"
            aria-label="Thêm"
            onClick={addUserProduct}
          />
        </Text>
        <InputGroup maxW="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="muted" boxSize="5" />
          </InputLeftElement>
          <Input
            {...register("search", { required: false })}
            placeholder={t("common#button#search")}
          />
          <Button variant="primary" px="5" py="5" ml="5" type="submit">
            {t("common#button#search")}
          </Button>
        </InputGroup>
      </Stack>
    </form>
  );
};
