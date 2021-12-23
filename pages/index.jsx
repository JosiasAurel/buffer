import React from "react";

import { Card, Tag, Button } from "@geist-ui/react";

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
                { notes.length > 0 ?
                    <main>
                        {notes.map((notes, idx) => {
                        return (
                            <Card key={idx}>
                                {notes}
                            </Card>
                        )
                    })}
                    <Button>
                        Add Note
                    </Button>
                    </main>
            : <div>
                <h2>No notes yet!</h2>
                <Button>
                        Add Note
                    </Button>
            </div> }
            </div>
        </div>
    )
}

export default App;