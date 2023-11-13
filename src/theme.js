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
        grayInactive1: "#8C8C8C"
    },
    styles: {
        global: (props) =>  ({
            body: {
                bg: mode("#fff", "#1A202C")(props),
            },
        }),
    }
});

export default theme;
