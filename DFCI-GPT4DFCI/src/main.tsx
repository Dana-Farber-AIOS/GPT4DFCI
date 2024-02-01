import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";

/* Reference for cssVarsRoot=":root"
    https://github.com/chakra-ui/chakra-ui/issues/6253 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme} cssVarsRoot=":root">
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
