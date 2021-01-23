import Head from "next/head";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Layout from "../components/Layout";

const styles = {
  global: {
    "html, body": {
      bg: "#c3dacd",
      fontSize: "l",
      fontFamily:
        "Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
      lineHeight: "tall",
    },
  },
};

// https://coolors.co/1c4532-2c5c44-347050-4d8f6d-4e7560-70907e-68d391-94ecbe-b3efb2-c3dacd
const colors = {
  theme: {
    50: "#c3dacd",
    100: "#b3efb2",
    200: "#94ecbe",
    300: "#68d391",
    400: "#70907e",
    500: "#4e7560",
    600: "#4d8f6d",
    700: "#347050",
    800: "#2c5c44",
    900: "#1c4532",
  },
};
const theme = extendTheme({ styles, colors });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="Samuel Ping" />
        <meta name="description" content="Samuel Ping's website!" />
        <meta
          name="keywords"
          content="Samuel, Ping, personal, website, intern, software, engineering"
        />
        <meta name="theme-color" content="#bdd9c8" />

        <link rel="manifest" href="site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="apple-touch-icon.png"></link>
      </Head>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
