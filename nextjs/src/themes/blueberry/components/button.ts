import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: "base",
  ":focus:not(:focus-visible)": {
    boxShadow: "none",
  },
  textTransform: "uppercase",
  fontWeight: "bold",
  _focus: {
    boxShadow: "none",
  },
});

const variantSolid = defineStyle({
  color: "on-accent",
  bg: "accent",
  _hover: {
    bg: "accent-muted",
    _disabled: {
      bg: "accent-disabled",
      color: "on-disabled",
    },
  },
  _active: {
    bg: "accent-emphasis",
  },
  _disabled: {
    color: "on-disabled",
    bg: "accent-disabled",
  },
});

const variantOutline = defineStyle({
  bg: "transparent",
  borderWidth: "2px",
  color: "muted",
  borderColor: "bg-muted",
  ">svg *, >span>svg *": {
    filter: "grayscale(100%)",
  },
  _hover: {
    color: "muted",
    bg: "bg-subtle",
    borderColor: "bg-muted",
    _disabled: {
      color: "disabled",
      borderColor: "disabled",
    },
  },
  _active: {
    color: "muted",
    bg: "bg-muted",
  },
  _disabled: {
    color: "disabled",
    borderColor: "disabled",
  },
});

const variantGhost = defineStyle({
  color: "emphasized",
  bg: "none",
  _hover: {
    bg: "bg-subtle",
    _disabled: {
      color: "disabled",
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
    color: "disabled",
  },
});

const variantLink = defineStyle({
  textTransform: "normal",
  fontWeight: "normal",
  fontSize: "md",
});

const variants = {
  primary: variantSolid,
  "primary-on-accent": defineStyle({
    bg: "on-accent",
    color: "accent-emphasis",
    _hover: {
      bg: "on-accent-muted",
      _disabled: {
        bg: "on-accent",
      },
    },
    _active: { bg: "on-accent-emphasis" },
  }),
  secondary: variantOutline,
  "secondary-on-accent": {
    color: "on-accent",
    _hover: {
      color: "on-accent-muted",
      bg: "bg-accent-muted",
    },
    _active: {
      color: "on-accent-emphasis",
      bg: "accent-emphasis",
    },
  },
  solid: variantSolid,
  outline: variantOutline,
  ghost: variantGhost,
  link: variantLink,
  "outline-on-accent": defineStyle({
    border: "1px",
    borderColor: "on-accent",
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
