import {
  RadioGroup,
  Stack,
  Radio,
  Box,
  Text,
  useColorModeValue,
  HStack,
  Center,
} from "@chakra-ui/react";
import {
  VisaLogo,
  MasterCardLogo,
  GooglePayLogo,
  PayPalLogo,
} from "../../../commons/icons";

export const PaymentMethod = (props: any) => {
  return (
    <RadioGroup colorScheme="blue" size="lg">
      <Stack direction={{ base: "column", lg: "row" }} spacing="6">
        <Radio defaultChecked spacing="3" flex="1">
          <Stack spacing="1.5">
            <Box>
              <Text
                color={useColorModeValue("black", "white")}
                fontWeight="medium"
              >
                Credit Card
              </Text>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                Pay with credit card via Stripe
              </Text>
            </Box>
            <HStack>
              <Center
                borderWidth="1px"
                width="8"
                height="5"
                bg={useColorModeValue("transparent", "gray.50")}
                borderColor={useColorModeValue("gray.300", "gray.50")}
                borderRadius="base"
              >
                <VisaLogo />
              </Center>
              <Center
                borderWidth="1px"
                width="8"
                height="5"
                bg={useColorModeValue("transparent", "gray.50")}
                borderColor={useColorModeValue("gray.300", "gray.50")}
                borderRadius="base"
              >
                <MasterCardLogo />
              </Center>
              <Center
                borderWidth="1px"
                width="8"
                height="5"
                bg={useColorModeValue("transparent", "gray.50")}
                borderColor={useColorModeValue("gray.300", "gray.50")}
                borderRadius="base"
              >
                <GooglePayLogo />
              </Center>
            </HStack>
          </Stack>
        </Radio>
        <Radio spacing="3" flex="1">
          <Stack spacing="1.5">
            <Box>
              <Text
                color={useColorModeValue("black", "white")}
                fontWeight="medium"
              >
                PayPal
              </Text>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                Pay with your PayPal account
              </Text>
            </Box>
            <HStack>
              <Center
                borderWidth="1px"
                width="8"
                height="5"
                bg={useColorModeValue("transparent", "gray.50")}
                borderColor={useColorModeValue("gray.300", "gray.50")}
                borderRadius="base"
              >
                <PayPalLogo />
              </Center>
            </HStack>
          </Stack>
        </Radio>
      </Stack>
    </RadioGroup>
  );
};
