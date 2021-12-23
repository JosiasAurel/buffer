import React from "react";

import { Card, Tag, Button, Textarea, Fieldset } from "@geist-ui/react";

import { createKey, connectWithKey } from "../utils/cryptoman";

import styles from "../styles/index.module.css";

const App = () => {
    const [secret, setSecret] = React.useState("");
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState([]);
    const [createNote, setCreateNote] = React.useState(false);

    React.useEffect(() => {
        const secret = localStorage.getItem("secret") ?? undefined;

        if (secret !== undefined) {
            setSecret(secret);
        } else {
            const { newSecurityKey } = createKey();
            setSecret(newSecurityKey);
        }

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
                            <Button auto scale={0.35}> Save </Button>
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
                            <Button auto scale={0.35}> Save </Button>
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