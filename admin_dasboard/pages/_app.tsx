import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../context/Store";
import { ChakraProvider } from "@chakra-ui/react";
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
