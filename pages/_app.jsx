import React from "react";

import "../styles/global.css";

const BufferedApp = ({Component, pageProps}) => {
    return <Component {...pageProps} />
}

export default BufferedApp;