import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import {
  getLightModeBorderImage,
  getDarkModeBorderImage,
} from "../foundations/border";
const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle((props) => ({
  root: {
    pos: "relative",
  },
  tab: {
    flex: props.isFitted ? 1 : undefined,
    color: "default",
    textTransform: "uppercase",
    _selected: {
      color: "accent",
    },
    _focusVisible: {
      boxShadow: "none",
    },
  },
}));
const variantLine = definePartsStyle((props) => {
  const { colorScheme } = props;
  const borderProp =
    props.orientation === "vertical" ? "borderStart" : "borderBottom";
  return {
    tablist: {
      borderImage: getLightModeBorderImage(),
      _dark: {
        borderImage: getDarkModeBorderImage(),
      },
      borderBottom: "unset",
      borderStart: "unset",
    },
    tab: {
      fontSize: "md",
      _selected: {
        borderColor: "accent",
        [borderProp + "Width"]: "2px",
      },
      _disabled: {
        color: "disabled",
        cursor: "not-allowed",
      },
    },
    indicator: {
      bg: mode(`${colorScheme}.500`, `${colorScheme}.400`)(props),
      mt: -1,
      height: 1,
      borderTopRadius: "base",
      position: "absolute",
    },
  };
});
const variantEnclosed = definePartsStyle((props) => {
  const { colorScheme } = props;
  return {
    tablist: {
      borderImage: getLightModeBorderImage({ borderBottomWidth: 0 }),
      _dark: {
        borderImage: getDarkModeBorderImage({ borderBottomWidth: 0 }),
      },
      borderBottomWidth: "4px",
    },
    tab: {
      fontSize: "md",
      borderStart: "4px solid transparent",
      borderEnd: "4px solid transparent",
      _selected: {
        borderImage: getLightModeBorderImage({ borderBottomWidth: 0 }),
        _dark: {
          borderImage: getDarkModeBorderImage({ borderBottomWidth: 0 }),
        },
        borderStartWidth: "4px",
        borderEndWidth: "4px",
        borderTopWidth: "4px",
        outline: "5px",
      },
      _disabled: {
        color: "disabled",
        cursor: "not-allowed",
      },
    },
    indicator: {
      bg: mode(`${colorScheme}.500`, `${colorScheme}.400`)(props),
      mt: -1,
      height: 1,
      borderTopRadius: "base",
      position: "absolute",
    },
  };
});
const variants = {
  line: variantLine,
  enclosed: variantEnclosed,
};
const defaultProps = {
  variant: "line",
  colorScheme: "green",
};
export const tabsTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps,
});
