import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { checkboxTheme } from "./checkbox";
const baseStyle = defineStyle(() => ({
  ...checkboxTheme.baseStyle?.()?.label,
  fontFamily: "unset",
  lineHeight: 7,
  _disabled: {
    opacity: 1,
    color: "disabled",
  },
}));
const sizes = {
  sm: {
    _peerPlaceholderShown: {
      fontSize: "sm",
      top: "0.5",
      left: "4",
    },
  },
  md: {
    fontSize: "md",
    _peerPlaceholderShown: {
      fontSize: "md",
      top: "1.5",
      left: "4",
    },
  },
  lg: {
    _peerPlaceholderShown: {
      fontSize: "lg",
      top: "2.5",
      left: "4",
    },
  },
};
export const formLabelTheme = defineStyleConfig({
  baseStyle,
  sizes,
});
