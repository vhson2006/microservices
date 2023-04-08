import { mode } from "@chakra-ui/theme-tools";
export const styles = {
  global: (props) => ({
    body: {
      color: "default",
      bg: "bg-canvas",
      fontSize: "16px",
      lineHeight: 1.1,
    },
    "*::placeholder": {
      color: mode("gray.500", "gray.500")(props),
    },
    ".chakra-text": {
      fontSize: "24px",
    },
    "*, *::before, &::after": {
      borderColor: mode("gray.300", "gray.300")(props),
    },
    "html,body": {
      height: "100%",
    },
    "#__next, #root": {
      display: "flex",
      flexDirection: "column",
      minH: "100%",
    },
  }),
};
