import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { getFilledBorderImageStyles } from "../foundations/border";
import { selectTheme } from "./select";
const baseStyle = defineStyle({
  menu: {
    maxW: "xs",
    border: "unset",
  },
});
const variants = {
  outline: defineStyle((props) => ({
    menu: {
      mt: 1.5,
      py: 0,
      bg: "bg-surface",
      overflow: "hidden",
      boxShadow: "md",
      _focus: {
        boxShadow: `${mode(
          `0px 0px 1px rgba(48, 49, 51, 0.05), 0px 4px 8px rgba(48, 49, 51, 0.1)`,
          `0px 0px 1px #0D0D0D, 0px 4px 8px rgba(13, 13, 13, 0.9)`
        )(props)} !important`,
      },
    },
    option: {
      _selected: {
        color: "on-accent",
        bg: "accent",
      },
      _hover: {
        bg: "accent",
        color: "on-accent",
      },
    },
    field: {
      ...selectTheme.variants?.outline(props).field,
      _expanded: {
        ...getFilledBorderImageStyles("accent", true),
        boxShadow: "unset",
      },
    },
  })),
};
export const customSelectTheme = defineStyleConfig({
  baseStyle,
  variants,
});
