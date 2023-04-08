import { menuAnatomy as parts } from "@chakra-ui/anatomy";
import { defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import {
  getDarkModeBorderImage,
  getLightModeBorderImage,
} from "../foundations/border";

import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleList = defineStyle({
  bg: "bg-surface",
  overflow: "hidden",
  boxShadow: "md",
  color: "default",
  minW: "3xs",
  py: "unset",
  zIndex: 1,
  borderRadius: "md",
  borderWidth: "0",
  _focus: {
    boxShadow: "md",
  },
});

const baseStyleItem = defineStyle({
  fontSize: "md",
  opacity: "unset",
  py: 2,
  px: 4,
  bg: "bg-surface",
  _focus: {
    bg: "accent",
    color: "on-accent",
  },
  _active: {
    bg: "accent",
    color: "on-accent",
    _disabled: {
      color: "default",
      bg: "initial",
      cursor: "not-allowed",
    },
  },
  _expanded: {
    bg: "gray.100",
    _dark: {
      bg: "whiteAlpha.100",
    },
  },
  _disabled: {
    opacity: 1,
    color: "disabled",
    cursor: "not-allowed",
    _active: {
      color: "disabled",
      bg: "bg-surface",
    },
  },
});

const baseStyleGroupTitle = defineStyle({
  mx: 4,
  my: 2,
  fontWeight: "semibold",
  fontSize: "sm",
});

const baseStyleCommand = defineStyle({
  color: "muted",
});

const baseStyleDivider = defineStyle(() => ({
  marginY: "-px",
  opacity: "unset",
  border: "unset",
  borderWidth: "3px",
  borderImage: getLightModeBorderImage(),
  _dark: {
    borderImage: getDarkModeBorderImage(),
  },
}));

const baseStyle = definePartsStyle({
  list: baseStyleList,
  item: baseStyleItem,
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider(),
});

export const menuTheme = defineMultiStyleConfig({
  baseStyle,
});
