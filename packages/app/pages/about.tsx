import React from "react";
import { Text } from "@geist-ui/core";
import styles from "../styles/index.module.css";
import Link from "next/link";

const AboutPage: React.FC = (): JSX.Element => {
  return (
    <div className={styles.aboutPage}>
      <div>
        <Text h2>Why Buffered.link ?</Text>
        <Text>
          I originally built this tool for{" "}
          <Link
            style={{ textDecoration: "underline" }}
            href="https://twitter.com/JosiasWing"
          >
            myself
          </Link>{" "}
          as I found myself going back and forth between a computer and my phone
          to share code snippets or just short pieces of text.
          <br />
          <br />I began my coding journey on my Android phone in ~2019 (which I
          still use today somehow) and it held a lot of my work. I tend to use{" "}
          <em>python -m http.server</em> but it requires me to connect my laptop
          to my hotspot and then look for its ip address in the network.
          <br />
          <br />
          The app allows me to store short pieces of text over the internet for
          about 24 hours before its automatically deleted. Since I built the
          first version the app has got hundreds of visits from several
          countries and is also being used by some friends at school.
        </Text>
      </div>
    </div>
  );
};

export default AboutPage;
