import { Box, Container, Divider } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AccentInformationComponent } from "./AccentInformationComponent";
import { AccentSubcribeFormComponent } from "./AccentSubcribeFormComponent";

export const AccentFooterComponent = (props: any) => {
  const { t, lang } = useTranslation("common");

  return (
    <Box as="footer" role="contentinfo" bg="bg-accent" {...props}>
      <Container>
        <Box
          minH="20"
          role="presentation"
          py="3"
          px="4"
          color="on-accent"
          {...props}
        >
          <AccentInformationComponent />
          <Divider borderColor="bg-accent-subtle" />
          <AccentSubcribeFormComponent />
        </Box>
      </Container>
    </Box>
  );
};
