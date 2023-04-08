import { alertAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const isFunction = (value) => typeof value === "function";
export function runIfFn(valueOrFn, ...args) {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const getColorScheme = (props) => {
  const { status = "info" } = props;
  const colorScheme = {
    info: "blue",
    loading: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  }[status];
  return {
    background: `${colorScheme}.500`,
    color: colorScheme === "yellow" ? "black" : "white",
  };
};
const baseStyleContainer = defineStyle((props) => {
  const { background, color } = getColorScheme(props);
  return {
    container: {
      lineHeight: "7",
      background,
      color,
      borderRadius: "base",
      fontSize: "md",
      px: 4,
      py: 2,
    },
    icon: {
      color,
      height: 6,
      width: 6,
    },
  };
});
const baseStyle = definePartsStyle((props) => ({
  container: runIfFn(baseStyleContainer, props),
}));
export const alertTheme = defineMultiStyleConfig({ baseStyle, variants: {} });
