import React from "react";
import { Toaster } from "react-hot-toast";
import { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "../styles/global.css";
import "inter-ui/inter.css";

const BufferedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </GeistProvider>
    </>
  );
};

export default BufferedApp;
