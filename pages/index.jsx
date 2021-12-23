import React from "react";

import { Card, Tag } from "@geist-ui/react";

import styles from "../styles/index.module.css";

const App = () => {
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState([]);

    return (
        <div>
            <header className={styles.header}>
                <Tag> Buffer.link </Tag>
            </header>

            <div className={styles.notes}>
                {notes.map((notes, idx) => {
                    return (
                        <Card key={idx}>
                            {notes}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default App;