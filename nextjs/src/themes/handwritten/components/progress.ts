import { progressAnatomy as parts } from "@chakra-ui/anatomy";
import { getBorderLineStyles } from "../foundations/border";

import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const variantSolid = definePartsStyle({
  filledTrack: {
    transition: "all 0.3s",
    ...getBorderLineStyles("accent"),
  },
  track: {
    ...getBorderLineStyles("subtle"),
  },
});

const variantOnAccent = definePartsStyle({
  filledTrack: {
    ...getBorderLineStyles("on-accent"),
  },
  track: {
    ...getBorderLineStyles("subtle"),
  },
});

const variants = {
  solid: variantSolid,
  "on-accent": variantOnAccent,
};

const defaultProps = {
  size: "lg",
  variant: "solid",
} as const;

export const progressTheme = defineMultiStyleConfig({
  variants,
  defaultProps,
});
