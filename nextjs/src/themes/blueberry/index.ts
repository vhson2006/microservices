import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";
import * as foundations from "./foundations";
import { styles } from "./styles";

export const theme: Record<string, any> = extendTheme(proTheme, {
  styles,
  ...foundations,
  colors: { ...foundations.colors, brand: foundations.colors["red"] },
  components,
  fonts: {
    heading: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
    body: "'Fira CodeVariable', -apple-system, system-ui, sans-serif",
  },
});
