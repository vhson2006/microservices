import { Stack, Button, Input, Image, Text } from "@chakra-ui/react";

export const AccentInformationComponent = (props: any) => {
  return (
    <Stack
      spacing="8"
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      py={{ base: "12", md: "16" }}
    >
      <Stack spacing={{ base: "6", md: "8" }} align="start">
        <Image src="/logo.png" height="8" alt="Yugioh" />
        <Text color="on-accent-muted">
          Create beautiful websites remarkably fast.
        </Text>
      </Stack>
      <Stack
        direction={{ base: "column-reverse", md: "column", lg: "row" }}
        spacing={{ base: "12", md: "8" }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="on-accent-subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link-on-accent">How it works</Button>
              <Button variant="link-on-accent">Pricing</Button>
              <Button variant="link-on-accent">Use Cases</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="on-accent-subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link-on-accent">Privacy</Button>
              <Button variant="link-on-accent">Terms</Button>
              <Button variant="link-on-accent">License</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="on-accent-subtle">
            Stay up to date
          </Text>
          <Stack
            spacing="4"
            direction={{ base: "column", sm: "row" }}
            maxW={{ lg: "360px" }}
          >
            <Input
              placeholder="Enter your email"
              type="email"
              required
              variant="outline-on-accent"
            />
            <Button variant="primary-on-accent" type="submit" flexShrink={0}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
