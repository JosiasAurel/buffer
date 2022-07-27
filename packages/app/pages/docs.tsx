import React from "react";
import { Text, Badge } from "@geist-ui/core";
import Link from "next/link";

const DocsPage: React.FC = (): JSX.Element => {
    return (
        <div>
            <header style={{
                width: "100vw",
                backdropFilter: "blur(5px)",
                top: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Link href="/">
                    <Badge style={{ margin: "1em" }}>Buffered.link</Badge>
                </Link>
            </header>
            <Text h1 style={{ textAlign: "center" }}>
                Buffered.link CLI Docs
            </Text>

            <main style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                <Text>
                    This documentation contains information about how to set up and use the Buffered.link CLI.
                    <br />
                    These intructions assume you are on a windows operating system but should be similar for other operating systems.
                </Text>
            </main>
        </div>
    )
}

export default DocsPage;