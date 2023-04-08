import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const ErrorMessage = ({ message }: any) => {
  return (
    <Alert status="error" mt={4}>
      <AlertIcon />
      <AlertTitle mr={2}>Something went wrong</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
