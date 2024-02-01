import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { extendTheme } from "@chakra-ui/react";

const colors = {};
const fonts = {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export default theme;
