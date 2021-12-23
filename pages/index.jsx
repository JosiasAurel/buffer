import React from "react";

import { Card, Tag, Button, Textarea, Fieldset } from "@geist-ui/react";

import { createKey, hashKey } from "../utils/cryptoman";
import { makeRequest } from "../utils/request";

import toast from "react-hot-toast";

import styles from "../styles/index.module.css";

const App = () => {
    const [secret, setSecret] = React.useState("");
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState([]);
    const [createNote, setCreateNote] = React.useState(false);

    function saveNote() {
        const hashedKey = hashKey(secret);
        toast.promise(makeRequest("/api/save", "POST", { note, key: hashedKey })
                        .then(_ => getNotes()), {
            loading: "Bufferizing...",
            success: "Buffered",
            error: "Failed to buffer"
        });

        getNotes();
    }

    function getNotes() {
        const hashedKey = hashKey(secret);
        toast.promise(makeRequest("/api/notes", { key: hashedKey })
                        .then(result => setNotes(result)), {
            loading: "Loading Buffer",
            success: "Got your buffer",
            error: "Failed to load Buffer"
        });
    }

    React.useEffect(() => {
        const secret = localStorage.getItem("secret") ?? undefined;

        if (secret !== undefined) {
            setSecret(secret);
        } else {
            const { newSecurityKey } = createKey();
            localStorage.setItem("secret", newSecurityKey);
            setSecret(newSecurityKey);
        }

        getNotes();

    }, []);


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
                    <Button onClick={_ => setCreateNote(!createNote)}>
                        Add Note
                    </Button>
                    { createNote ?
                    <div>
                    <Fieldset>
                        <Fieldset.Subtitle>
                        <Textarea value={note} onChange={e => setNote(e.target.value)}>
                    
                    </Textarea>
                        </Fieldset.Subtitle>
                        <Fieldset.Footer>
                            {new Date().toDateString()}
                            <Button onClick={_e => saveNote()} auto scale={0.35}> Save </Button>
                        </Fieldset.Footer>
                        </Fieldset>
                </div>
                : "" }
                    </main>
            : <div>
                <h2>No notes yet!</h2>
                <Button onClick={_ => setCreateNote(!createNote)}>
                        Add Note
                    </Button>
                    { createNote ?
                    <div>
                        <Fieldset>
                        <Fieldset.Subtitle>
                        <Textarea value={note} onChange={e => setNote(e.target.value)}>
                    
                    </Textarea>
                        </Fieldset.Subtitle>
                        <Fieldset.Footer>
                            {new Date().toDateString()}
                            <Button onClick={_e => saveNote()} auto scale={0.35}> Save </Button>
                        </Fieldset.Footer>
                        </Fieldset>

                </div>
                : "" }
            </div> }
            </div>
        </div>
    )
}

export default App;