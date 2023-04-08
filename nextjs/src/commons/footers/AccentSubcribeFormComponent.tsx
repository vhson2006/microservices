import { Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export const AccentSubcribeFormComponent = (props: any) => {
  return (
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      align="center"
    >
      <Text fontSize="sm" color="on-accent-subtle">
        &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
        reserved.
      </Text>
      <ButtonGroup variant="ghost-on-accent">
        <IconButton
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="GitHub"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  );
};
