import React from "react";
import Link from "next/link";
import { Text, Spacer } from "@geist-ui/core";

const Footer: React.FC = (): JSX.Element => {
    return (
        <>
            <footer style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                <Text>
                    Made by{" "}
                    <Link href="https://twitter.com/JosiasWing">Josias Aurel</Link>
                    on
                    Earth 🌍
                </Text>
                <span
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <Link href="/docs">Docs</Link>
                    <Link href="https://app.splitbee.io/public/buffered.link">
                        Analytics
                    </Link>
                    <Link href="https://github.com/JosiasAurel/buffer">Source Code</Link>
                </span>
                <Spacer />
                <Text style={{ textAlign: "center" }} h4>Built for PlanetScale x Hashnode Hackathon</Text>
            </footer>
            <Spacer h={3} />
        </>
    );
};

export default Footer;
