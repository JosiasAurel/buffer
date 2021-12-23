import React from "react";

import { Card, Tag, Button, Textarea, Fieldset, Spacer, Modal, Input } from "@geist-ui/react";

import { createKey, hashKey } from "../utils/cryptoman";
import { makeRequest } from "../utils/request";

import toast from "react-hot-toast";

import styles from "../styles/index.module.css";

const App = () => {
    const [newSecret, setNewSecret] = React.useState("");
    const [newUserModal, setNewUserModal] = React.useState(false);
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

    // setInterval(() => getNotes(), 5000); // fetch all notes every 5 seconds
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

    }, [newSecret]);


    return (
        <div>
            <header className={styles.header}>
                <span>
                <Tag> Buffer.link </Tag>
                </span>
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
                    <div>
                    <Button onClick={_ => setCreateNote(!createNote)}>
                        Add Note
                    </Button>
                    <Spacer />
                    </div>
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
                    <Spacer />
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
            {/* new user modal */}
            <Modal value={newUserModal} onClose={() => setNewUserModal(false)}>
                <Modal.Title>
                    Are you new ? Otherwise, enter your secret below
                </Modal.Title>
                <Modal.Content>
                    <Input clearable placeholder="Secret" value={newSecret} onChange={e => setNewSecret(e.target.value)} />
                    <Button onClick={_ => {
                        localStorage.setItem("secret", newSecret);
                    }}>
                        Save
                    </Button>
                </Modal.Content>
            </Modal>

        </div>
    )
}

export default App;