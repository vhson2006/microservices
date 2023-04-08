import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import {
  getDarkModeBorderImage,
  getLightModeBorderImage,
} from "../foundations/border";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const variants = {
  outline: definePartsStyle(() => ({
    field: {
      color: "emphasized",
      bg: "inherit",
      borderRadius: "base",
      border: "4px solid",
      borderImage: getLightModeBorderImage(),
      _dark: {
        borderImage: getDarkModeBorderImage(),
      },
      borderColor: "input-border-default",
      _hover: {
        bg: "bg-subtle",
        borderColor: "input-border-default",
      },
      _active: {
        _hover: {
          bg: "unset",
        },
      },
      _focus: {
        boxShadow: "unset",
        borderColor: "accent-emphasis",
        _hover: {
          bg: "unset",
        },
      },
      _invalid: {
        boxShadow: "unset",
        borderColor: "red.500",
      },
      _placeholder: {
        opacity: "unset",
        color: "subtle",
        display: "block",
      },
      _readOnly: {
        color: "subtle",
      },
      _disabled: {
        borderColor: "input-border-disabled",
        _placeholder: {
          color: "disabled",
        },
      },
    },
    addon: {
      bg: "none",
      border: "4px solid",
      borderImage: getLightModeBorderImage({ borderBottomWidth: 0 }),
      _dark: {
        borderImage: getDarkModeBorderImage({ borderBottomWidth: 0 }),
      },
      userSelect: "none",
    },
  })),
  "outline-on-accent": definePartsStyle(() => ({
    field: {
      bg: "bg-accent-muted",
      color: "on-accent",
      borderRadius: "base",
      border: "5px solid",
      borderImage: getDarkModeBorderImage(),
      _active: {
        color: "on-accent-emphasis",
      },
      _placeholder: {
        color: "on-accent-subtle",
      },
      _hover: {
        borderColor: "on-accent-muted",
      },
      _focus: {
        borderColor: "on-accent-emphasis",
        boxShadow: "none",
      },
      _disabled: {
        opacity: 0.4,
      },
    },
  })),
  filled: definePartsStyle(() => ({
    field: {
      borderRadius: "base",
      border: "5px solid",
      borderImage: getDarkModeBorderImage(),
      bg: "bg-accent-muted",
      color: "on-accent-subtle",
      _hover: {
        bg: "bg-accent-muted",
        borderColor: "on-accent",
      },
      _placeholder: {
        color: "on-accent-subtle",
      },
      _focus: {
        bg: "bg-accent-muted",
        borderColor: "on-accent",
        color: "on-accent",
        _placeholder: {
          color: "on-accent",
        },
      },
    },
  })),
};

export const inputTheme = defineMultiStyleConfig({
  variants,
});
