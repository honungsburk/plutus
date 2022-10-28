import Colors from "./Colors";
import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

const global = (props: Dict<any>) => ({
  body: {
    // bg: "gray.100",
  },
});

export const Theme = extendTheme({
  styles: {
    global: global,
  },
  layerStyles: {},
  colors: Colors,
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default Theme;
