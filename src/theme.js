// theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  colors: {
    primary: "#0075F2",
    secondary: "#272727",
    tertiary: "#FED766",
    grayActive1: "#414141",
    grayActive2: "#A0AEC0",
    grayInactive1: "#8C8C8C",
    darkModeBackground: "#1A202C",
    lightModeBackground: "#f5f5f5",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#f5f5f5", "#1A202C")(props),
      },
    }),
  },
});

export default theme;
