import {
  Stack,
  Heading,
  useBreakpointValue,
  Box,
  Text,
} from "@chakra-ui/react";

export const PageHeader = (props: any) => {
  const { title, description } = props;
  return (
    <Box pt="8" pb="16">
      <Stack spacing={{ base: "8", md: "10" }} align="center">
        <Stack spacing={{ base: "4", md: "6" }} textAlign="center">
          <Stack spacing="4">
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
              {title}
            </Heading>
          </Stack>
          <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl" color="muted">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
