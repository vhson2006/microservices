import { sliderAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import {
  getAccentBorderLineStyles,
  getCircleBorderStyles,
} from "../foundations/border";
import {
  blackBorderUrl,
  whiteBorderUrl,
} from "../foundations/images/border-data-images";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {},
  track: {
    bg: `url(${blackBorderUrl})`,
    _dark: {
      bg: `url(${whiteBorderUrl})`,
    },
  },
  filledTrack: {
    ...getAccentBorderLineStyles(),
  },
  thumb: {
    bg: "accent",
    boxShadow: "none",
    ...getCircleBorderStyles("20"),
    _focus: {
      boxShadow: "none",
    },
  },
});

export const sliderTheme = defineMultiStyleConfig({
  baseStyle,
});
