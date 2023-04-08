import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  textDecoration: "none",
});

export const linkTheme = defineStyleConfig({
  baseStyle,
});
