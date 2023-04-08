import { avatarAnatomy as avatar } from "@chakra-ui/anatomy";

import {
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/react";
import { getCircleBorderStyles } from "../foundations/border";

const { definePartsStyle } = createMultiStyleConfigHelpers(avatar.keys);

const baseStyle = definePartsStyle((props) => {
  const outlineStyles = defineStyle({
    outline: "4px solid",
    outlineOffset: "-1px",
    outlineColor: "bg-canvas",
  });

  return {
    label: {},
    container: {
      border: "unset",
      ...(props.src ? {} : getCircleBorderStyles("20")),
      ...(props.src ? {} : outlineStyles),
      bg: "accent",
      color: "on-accent",
      "> svg": {
        m: 2,
        color: "on-accent",
      },
    },
  };
});

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
