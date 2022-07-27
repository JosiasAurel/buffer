import React from "react";
import { Text, Button, Snippet } from "@geist-ui/core";
import styles from "../styles/index.module.css";
import Link from "next/link";

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

                    <Link href="/app">
                        <Button auto type="secondary">
                            Open App
                        </Button>
                    </Link>

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

            <footer>

            </footer>
        </div>
    )
}

export default IndexPage;