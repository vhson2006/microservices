import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  fontWeight: "semibold",
});

const sizes = {
  "2xl": {
    fontSize: "5xl",
    lineHeight: "5.625rem",
    letterSpacing: "tight",
  },
  xl: {
    fontSize: "4xl",
    lineHeight: "4.5rem",
    letterSpacing: "tight",
  },
  lg: {
    fontSize: "3xl",
    lineHeight: "3.75rem",
    letterSpacing: "tight",
  },
  md: {
    fontSize: "2xl",
    lineHeight: "2.75rem",
    letterSpacing: "tight",
  },
  sm: {
    fontSize: "xl",
    lineHeight: "2.375rem",
  },
  xs: {
    fontSize: "lg",
    lineHeight: "2rem",
  },
};

export const headingTheme = defineStyleConfig({
  baseStyle,
  sizes,
});
