import React from "react";

import "../styles/global.css";

import { Toaster } from "react-hot-toast";

import { AppProps } from "next/app";

const BufferedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
            <Toaster position="bottom-center" />
        </>
    )
}

export default BufferedApp;