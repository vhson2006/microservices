import { avatarAnatomy as avatar } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyleConfig,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const { definePartsStyle } = createMultiStyleConfigHelpers(avatar.keys);
const baseStyle = definePartsStyle((props) => ({
  label: {},
  container: {
    bg: "accent",
    outline: "2px solid",
    outlineColor: mode(
      "rgba(255, 255, 255, 0.02)",
      "rgba(23, 23, 23, 0.05)"
    )(props),
    color: "on-accent",
    "> svg": {
      m: 2,
      color: "on-accent",
    },
  },
}));
const sizes = {
  xs: {
    label: {
      fontSize: "2xs",
    },
  },
  sm: {
    label: {
      fontSize: "2xs",
    },
  },
  md: {
    label: {
      fontSize: "sm",
    },
  },
  lg: {
    label: {
      fontSize: "md",
    },
  },
  xl: {
    label: {
      fontSize: "1.625rem",
    },
  },
  "2xl": {
    container: {
      width: 20,
      height: 20,
    },
    label: {
      fontSize: "2.25rem",
    },
  },
};
const defaultProps = {
  colorScheme: "blue",
};
export const avatarTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps,
});
