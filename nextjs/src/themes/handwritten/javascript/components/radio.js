import { radioAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { getCircleBorderStyles } from "../foundations/border";
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  control: {
    outline: "5px solid",
    outlineColor: "bg-canvas",
    outlineOffset: "-5px",
    border: "none",
    ...getCircleBorderStyles("20", "accent"),
    _hover: {
      borderColor: "accent-emphasis",
      _disabled: {
        borderColor: "disabled",
      },
    },
    _checked: {
      color: "accent",
      borderColor: "accent",
      _hover: {
        color: "accent-emphasis",
        borderColor: "accent-emphasis",
      },
      _disabled: {
        color: "disabled",
        borderColor: "disabled",
        _hover: {
          borderColor: "disabled",
        },
      },
    },
    _focus: {
      boxShadow: "none",
    },
    _disabled: {
      background: "unset",
      ...getCircleBorderStyles("20", "disabled"),
      cursor: "not-allowed",
      borderColor: "disabled",
      _hover: {
        borderColor: "disabled",
      },
    },
  },
});
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
    label: { fontSize: "lg" },
  },
};
export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
});
