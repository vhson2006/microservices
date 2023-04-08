import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { getRoundedFilledBorderImageStyles } from "../foundations/border";
const baseStyle = defineStyle({
  pl: 5,
  pr: 5,
  lineHeight: "1.25rem",
  fontSize: "xs",
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: "base",
});
const variantSolid = defineStyle(() => {
  return {
    ...getRoundedFilledBorderImageStyles(),
    color: "on-accent",
  };
});
const variantSubtle = defineStyle(() => {
  return {
    ...getRoundedFilledBorderImageStyles(),
  };
});
const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
};
const defaultProps = {
  variant: "solid",
};
export const badgeTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps,
});
