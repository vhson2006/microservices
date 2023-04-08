import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
const baseStyle = defineStyle({
  _focus: {
    boxShadow: "none",
  },
});
export const closeButtonTheme = defineStyleConfig({
  baseStyle,
});
