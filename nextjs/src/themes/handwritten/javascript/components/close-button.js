import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
const baseStyle = defineStyle({
  _focus: {
    boxShadow: "none",
  },
  _focusVisible: {
    boxShadow: "none",
  },
});
export const closeButtonTheme = defineStyleConfig({
  baseStyle,
});
