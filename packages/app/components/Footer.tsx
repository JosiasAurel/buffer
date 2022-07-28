import React from "react";
import Link from "next/link";
import { Text, Spacer } from "@geist-ui/core";

const Footer: React.FC = (): JSX.Element => {
    return (
        <>
            <footer>
                <Text>
                    Made by{" "}
                    <Link href="https://twitter.com/JosiasWing">Josias Aurel</Link>on
                    Earth 🌍
                </Text>
                <span
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <Link href="/docs">Docs</Link>
                    <Link href="https://app.splitbee.io/public/buffered.link">
                        Analytics
                    </Link>
                    <Link href="https://github.com/JosiasAurel/buffer">Source Code</Link>
                </span>
            </footer>
            <Spacer h={5} />
        </>
    );
};

export default Footer;
