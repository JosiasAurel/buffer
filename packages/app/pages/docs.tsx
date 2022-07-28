import React from "react";
import { Text, Badge, Spacer, Snippet } from "@geist-ui/core";
import Link from "next/link";
import Image from "next/image";

const DocsPage: React.FC = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <header
        style={{
          width: "100vw",
          backdropFilter: "blur(5px)",
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/">
          <Badge style={{ margin: "1em" }}>Buffered.link</Badge>
        </Link>
      </header>
      <Text h1 style={{ textAlign: "center" }}>
        Buffered.link CLI Docs
      </Text>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "0 1em",
        }}
      >
        <Text>
          This documentation contains information about how to set up and use
          the Buffered.link CLI.
          <br />
          These intructions assume you are on a windows operating system but
          should be similar for other operating systems.
        </Text>
        <Text h2> Download and Set Up</Text>
        <Text>
          <ul>
            <li>
              First download the official binary from the{" "}
              <Link href="https://github.com/JosiasAurel/buffer/releases/tag/v2.0.0">
                releases page
              </Link>{" "}
              on Github.
            </li>
            <li>Put the binary in a directory of your choice. </li>
            <li>
              You then have to add this directory to <b>path</b> environment
              variable.
            </li>
            <li>
              Make sure to rename the binary to <b>bfdl</b> for convenience.
            </li>
            <li>
              Open a new terminal session and type <b>bfdl</b>.
              <br />
              If the binary was correctly added, you should see a help text.
            </li>
            <li>
              Now we need to add your credentials. Open{" "}
              <Link href="https://buffered.link/app">the app</Link> and
              settings.
            </li>
            <li>
              On your computer, create a new environment variable called{" "}
              <b>BFL_SECRET</b>. <br /> This will hold your credentials.
            </li>
            <li>
              In your settings, the first short string is your secret and the
              second represents your public key. <br /> Together they form your
              keypair.
            </li>
            <li>
              You are going to set the value of the newly created{" "}
              <b>BFL_SECRET</b> to hold your keypair in the form{" "}
              <em>secret,publicKey</em>
            </li>
            <li>
              Notice there are no spaces after the comma and the order matters.
            </li>
            <Image
              src="/screen1.png"
              width="400%"
              height="200%"
              loading="lazy"
            />
            <li>Next we need to set up the URL where the API lives.</li>
            <li>
              Create a new environment variable named <b>BFL_SERVICE</b> and set
              its value to <b>https://buffered.link/api</b>
            </li>
            <Image
              src="/screen2.png"
              width="800%"
              height="200%"
              loading="lazy"
            />
          </ul>
        </Text>
        <Text h2>Using the CLI</Text>
        <Text>
          <ul>
            <li>
              To upload a new text file, run
              <br />
              <Snippet>bfdl buffer file.txt </Snippet>
              <br />
              Replace <b>file.txt</b> with your actual file. It could also be a
              source file.
              <br />
              Uploading a new file returns its <b>ID</b> which can later be
              used.
            </li>
            <li>
              Refresh a buffer with
              <br />
              <Snippet>bfdl refresh buffer-id</Snippet>
              <br />
              Replace <b>buffer-id</b> with the actual ID.
            </li>
            <li>
              To get a buffer, run
              <br />
              <Snippet>bfdl get buffer-id file.txt</Snippet>
              <br />
              This will get a buffer with id <b>buffer-id</b> and write its
              content to <b>file.txt</b>
            </li>
          </ul>
        </Text>
      </main>

      <footer>
        <Text>
          Made by{" "}
          <Link href="https://twitter.com/JosiasWing">Josias Aurel</Link> on
          Earth 🌍{" "}
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
    </div>
  );
};

export default DocsPage;
