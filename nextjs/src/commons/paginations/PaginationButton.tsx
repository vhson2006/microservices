import { ButtonGroup, Button } from "@chakra-ui/react";

export const PaginationButton = (props: any) => {
  const { page, totalPage, gotoPage } = props;
  const pageButton = (index: any) => (
    <Button
      key={index}
      variant={index + 1 == page ? "primary" : "secondary"}
      onClick={() => gotoPage(index + 1)}
    >
      {index + 1}
    </Button>
  );

  return (
    <ButtonGroup
      spacing="3"
      justifyContent="space-center"
      width={{ base: "full", md: "auto" }}
    >
      {Array.from(Array(totalPage).keys()).map(pageButton)}
    </ButtonGroup>
  );
};
