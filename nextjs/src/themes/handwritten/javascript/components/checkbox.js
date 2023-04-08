import { checkboxAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import {
  getDarkModeBorderImage,
  getLightModeBorderImage,
} from "../foundations/border";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle(() => ({
  icon: {
    color: "on-accent",
  },
  control: {
    borderImage: getLightModeBorderImage(),
    _dark: {
      borderImage: getDarkModeBorderImage(),
    },
    borderWidth: "4px",
    bg: "unset",
    ">div>svg": {
      color: "accent",
      _hover: {
        color: "accent-emphasis",
      },
    },
    _hover: {
      bg: "bg-subtle",
      borderColor: "bg-muted",
      ">svg": {
        color: "accent-emphasis",
      },
    },
    _active: {
      bg: "unset",
    },
    _checked: {
      bg: "unset",
      color: "accent",
      borderColor: "bg-muted",
      ">div>svg": {
        color: "accent",
      },
      _hover: {
        bg: "bg-subtle",
        color: "accent-emphasis",
        borderColor: "bg-muted",
        ">div>svg": {
          color: "accent-emphasis",
        },
      },
      _active: {
        bg: "unset",
      },
      _disabled: {
        bg: "unset",
        borderColor: "disabled",
        _hover: {
          borderColor: "disabled",
        },
        _active: {
          bg: "unset",
        },
      },
    },
    _indeterminate: {
      borderColor: "bg-muted",
      _hover: {
        borderColor: "bg-muted",
      },
      bg: "unset",
      ">div>svg": {
        color: "accent",
        _hover: {
          color: "accent-emphasis",
        },
      },
      _disabled: {
        ">div>svg": {
          color: "disabled",
        },
      },
    },
    _focus: {
      boxShadow: "none",
    },
    _disabled: {
      bg: "unset",
      borderColor: "disabled",
      _hover: {
        borderColor: "disabled",
      },
      _checked: {
        ">div>svg": {
          color: "disabled",
        },
      },
      ">div>svg": {
        color: "disabled",
      },
    },
  },
  label: {
    lineHeight: "1.1",
    color: "default",
    _disabled: {
      opacity: "unset",
      color: "disabled",
    },
  },
}));
const sizes = {
  md: {
    control: {
      width: 5,
      height: 5,
      _checked: {
        _before: {
          w: 2.5,
          h: 2.5,
        },
      },
    },
    label: { fontSize: "md" },
  },
  lg: {
    control: {
      width: 6,
      height: 6,
      _checked: {
        _before: {
          w: 3.5,
          h: 3.5,
        },
      },
    },
    label: { fontSize: "md" },
  },
};
const defaultProps = {
  size: "lg",
};
export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps,
  sizes,
});
