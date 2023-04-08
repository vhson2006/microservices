import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import {
  getLightModeBorderImage,
  getDarkModeBorderImage,
} from "../foundations/border";

const baseStyle = defineStyle(() => ({
  opacity: "unset",
  border: "unset",
  borderWidth: "3px",
  borderImage: getLightModeBorderImage(),
  _dark: {
    borderImage: getDarkModeBorderImage(),
  },
}));

export const dividerTheme = defineStyleConfig({
  baseStyle,
});
