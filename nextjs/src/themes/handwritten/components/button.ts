import { defineStyle, defineStyleConfig, useToken } from "@chakra-ui/react";
import {
  getCircleBorderLineStyles,
  getCircleBorderStyles,
  getDarkModeBorderImage,
  getFilledBorderImageStyles,
  getLightModeBorderImage,
} from "../foundations/border";

const baseStyle = defineStyle({
  ":focus:not(:focus-visible)": {
    boxShadow: "none",
  },
  textTransform: "uppercase",
  fontWeight: "bold",
  _focus: {
    boxShadow: "none",
  },
  _focusVisible: {
    boxShadow: "none",
  },
});

const variantSolid = defineStyle((props) => ({
  color: "on-accent",
  bg: "accent",
  outline: "3px solid",
  outlineOffset: props.borderRadius === "full" ? "-2px" : "-3px",
  outlineColor: "bg-canvas",
  ...(props.borderRadius === "full"
    ? getCircleBorderStyles("20")
    : getFilledBorderImageStyles("inherit")),
  _hover: {
    bg: "accent-muted",
    _disabled: {
      opacity: 0.4,
    },
  },
  _active: {
    bg: "accent-emphasis",
  },
  _focus: {
    bg: "accent-emphasis",
    outline: "3px solid !important",
    outlineColor: `${useToken("colors", "bg-canvas")} !important`,
  },
  _focusVisible: {
    outline: "3px solid",
  },
  _disabled: {
    opacity: 0.4,
  },
}));

const variantOutline = defineStyle((props) => ({
  border: props.borderRadius === "full" ? "unset" : "4px solid",
  ...(props.borderRadius === "full"
    ? getCircleBorderLineStyles("bg-muted", "20")
    : {
        borderImage: getLightModeBorderImage(),
        _dark: {
          borderImage: getDarkModeBorderImage(),
        },
      }),
  color: "muted",
  bg: "unset",
  ">svg *, >span>svg *": {
    filter: "grayscale(100%)",
  },
  _hover: {
    color: "muted",
    bg: "bg-subtle",
    borderColor: "bg-muted",
    _disabled: {
      opacity: 0.4,
    },
  },
  _active: {
    bg: "unset",
  },
  _disabled: {
    opacity: 0.4,
  },
}));

const variantGhost = defineStyle({
  color: "emphasized",
  bg: "none",
  _hover: {
    bg: "bg-subtle",
    _disabled: {
      opacity: 0.4,
    },
  },
  _active: {
    color: "emphasized",
    bg: "bg-muted",
  },
  _activeLink: {
    color: "on-accent",
    bg: "accent",
    "*>svg": {
      color: "on-accent",
    },
  },
  _disabled: {
    opacity: 0.4,
  },
});

const variantLink = defineStyle({
  textDecoration: "underline",
  textTransform: "normal",
  fontWeight: "normal",
  fontSize: "md",
});

const variants = {
  primary: variantSolid,
  "primary-on-accent": defineStyle({
    ...getFilledBorderImageStyles("on-accent"),
    outline: "3px solid",
    outlineOffset: "-3px",
    outlineColor: "bg-accent",
    bg: "on-accent",
    color: "accent-emphasis",
    _hover: {
      bg: "on-accent-muted",
      _disabled: {
        bg: "on-accent",
        opacity: 0.4,
      },
      _after: {
        bg: "on-accent-muted",
        _disabled: {
          bg: "on-accent",
          opacity: 0.4,
        },
      },
      _before: {
        bg: "on-accent-muted",
        _disabled: {
          bg: "on-accent",
          opacity: 0.4,
        },
      },
    },
    _focus: {
      outline: "3px solid !important",
    },
    _focusVisible: {
      outline: "3px solid !important",
    },
    _active: {
      bg: "on-accent-emphasis",
      _after: {
        bg: "on-accent-emphasis",
      },
      _before: {
        bg: "on-accent-emphasis",
      },
    },
    _disabled: {
      _after: {
        opacity: 0.4,
      },
      _before: {
        opacity: 0.4,
      },
    },
  }),
  secondary: variantOutline,
  "secondary-on-accent": defineStyle({
    border: "4px",
    color: "on-accent",
    borderImage: getDarkModeBorderImage(),
    _hover: {
      color: "on-accent-muted",
      bg: "bg-accent-muted",
    },
    _active: {
      color: "on-accent-emphasis",
      bg: "accent-emphasis",
    },
  }),
  solid: variantSolid,
  outline: variantOutline,
  ghost: variantGhost,
  link: variantLink,
  "outline-on-accent": defineStyle({
    border: "4px",
    borderImage: getDarkModeBorderImage(),
    color: "on-accent",
    _hover: {
      color: "on-accent-muted",
      bg: "bg-accent-muted",
    },
    _active: {
      color: "on-accent-emphasis",
      bg: "accent-emphasis",
    },
  }),
  "ghost-on-accent": defineStyle({
    color: "on-accent",
    bg: "bg-accent",
    _hover: {
      color: "on-accent-subtle",
      bg: "bg-accent-subtle",
    },
    _activeLink: {
      color: "on-accent",
      bg: "bg-accent-muted",
    },
    _active: {
      bg: "bg-accent-muted",
    },
  }),
};

const sizes = {
  sm: {
    h: 8,
    minW: 8,
    fontSize: "sm",
    px: 4,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: "md",
    px: 4,
  },
  lg: {
    h: 12,
    minW: 12,
    px: 4,
    fontSize: "21px",
  },
  xl: {
    h: 16,
    minW: 16,
    px: 4,
    fontSize: "21px",
  },
};

export const buttonTheme = defineStyleConfig({ baseStyle, variants, sizes });
