import React from "react";
import { Text, Button, Card, Grid, Spacer } from "@geist-ui/core";
import styles from "../styles/index.module.css";
import Link from "next/link";

const features: string[] = [
    "Completely free and Open Source",
    "Create Unlimited Buffers",
    "Buffer Expires After 24 Hours",
    "Refresh a Buffer to prolong its period",
    "Edit/Delete a Buffer",
    "Upload Small Text Files with the Go-based CLI",
    "Share Your Buffer To The Public"
];

const IndexPage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.indexPage}>
            <main className={styles.main}>
                <div className={styles.flexCenterCol}>
                    <Text h1>
                        Bufferd.link
                    </Text>
                    <Text style={{ fontFamily: "cursive" }}>
                        Your text buffer
                    </Text>

                    <span style={{ display: "flex", flexDirection: "row" }}>
                        <Link href="/docs">
                            <Button auto>
                                Docs
                            </Button>
                        </Link>
                        <Spacer h={0} w={2} />
                        <Link href="/app">
                            <Button auto type="secondary">
                                Open App
                            </Button>
                        </Link>
                    </span>

                </div>
            </main>

            <div>
                <Text h2>
                    Why Buffered.link ?
                </Text>
                <Text>
                    I originally built the tool for <Link style={{ textDecoration: "underline" }} href="https://twitter.com/JosiasWing">myself </Link>
                    as I was constantly sharing small text between my phone and my computer.

                    <br />
                    <br />
                </Text>
                <Text h2>
                    Buffered.link is for you if;
                </Text>
                <ul>
                    <li>You constantly share text and snippets between two or more devices
                    </li>
                    <li>Share small text files</li>
                    <li>Your devices have access to the internet</li>
                    <li>You don't want to deal with accounts bullshit</li>
                    <li>Want something that just works</li>
                </ul>
                <Text h2>
                    Buffered.link is not for you if;
                </Text>
                <ul>
                    <li>Your devices have no access to the internet</li>
                    <li>You share huge files. Try <Link href="https://transfer.sh/">transfer.sh</Link> </li>
                </ul>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Grid.Container justify="center" gap={2} style={{ margin: "2em" }}>
                    {features.map((item, idx) => {
                        return (
                            <Grid key={idx}>
                                <Card style={{ maxWidth: "250px" }}>
                                    <Text h3 style={{ textAlign: "center" }}>
                                        {item}
                                    </Text>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid.Container>
            </div>

            <footer>
                <Text>Made by <Link href="https://twitter.com/JosiasWing">Josias Aurel</Link> on Earth 🌍 </Text>
                <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    <Link href="/docs">
                        Docs
                    </Link>
                    <Link href="https://app.splitbee.io/projects/buffered.link">
                        Analytics
                    </Link>
                    <Link href="https://github.com/JosiasAurel/buffer">
                        Source Code
                    </Link>
                </span>
            </footer>
        </div>
    )
}

export default IndexPage;