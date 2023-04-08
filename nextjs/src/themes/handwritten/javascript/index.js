import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";
import * as foundations from "./foundations";
import { styles } from "./styles";
export const theme = extendTheme(
  {
    styles,
    ...foundations,
    ...foundations.typography,
    colors: { ...foundations.colors, brand: foundations.colors["orange"] },
    components,
  },
  extendTheme(proTheme)
);
