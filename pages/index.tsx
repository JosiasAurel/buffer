import React from "react";

import { Note, Tag, Button, Textarea, Fieldset, Spacer, Modal, Input, useClipboard } from "@geist-ui/react";

import { createKey, hashKey } from "../utils/cryptoman";
import { makeRequest } from "../utils/request";

import toast from "react-hot-toast";

import styles from "../styles/index.module.css";

const App: React.FC = (): JSX.Element => {
    const [newSecret, setNewSecret] = React.useState<string>("");
    const [newUserModal, setNewUserModal] = React.useState<boolean>(false);
    const [settings, setSettings] = React.useState<boolean>(false);
    const [secret, setSecret] = React.useState<string>("");
    const [buffer, setBuffer] = React.useState<string>("");
    const [buffers, setBuffers] = React.useState<Array<any>>([]);
    const [createBuffer, setCreateBuffer] = React.useState<boolean>(false);
    const [toggleChange, setToggleChange] = React.useState<boolean>(false);

    // clipboard
    const { copy } = useClipboard();

    function saveBuffer() {
        const hashedKey = hashKey(secret);
        toast.promise(makeRequest("/api/save", { buffer, key: hashedKey })
            .then(_ => getBuffers()), {
            loading: "Bufferizing...",
            success: "Buffered",
            error: "Failed to buffer"
        });
        setCreateBuffer(false);
        getBuffers();
    }

    function getBuffers() {
        const secret = localStorage.getItem("secret");
        const hashedKey = hashKey(secret);
        toast.promise(makeRequest("/api/buffers", { key: hashedKey })
            .then((result: any) => {
                console.log("result", result);
                const clientBuffers: Array<string> = [];
                result?.fetchedBuffers.map(buffer => clientBuffers.push(buffer.buffer));
                console.log("clientBuffers", clientBuffers);
                setBuffers(clientBuffers);
            }), {
            loading: "Loading Buffer",
            success: "Got your buffer",
            error: "Failed to load Buffer"
        });
    }

    // setInterval(() => getBuffers(), 5000); // fetch all notes every 5 seconds
    React.useEffect(() => {
        const localSecret = localStorage.getItem("secret") ?? undefined;
        console.log("localSecret", localSecret);
        if (localSecret) {
            setSecret(localSecret);
            getBuffers();
        } else {
            setNewUserModal(true);
        }

    }, [toggleChange]);


    return (
        <div>
            <header className={styles.header}>
                <span>
                    <Tag onClick={() => {
                        setSettings(true);
                    }}> Buffer.link </Tag>
                </span>
            </header>

            <div className={styles.notes}>
                <Spacer h={3} />
                {buffers.length > 0 ?
                    <main>
                        {createBuffer ?
                            <>
                                <Fieldset>
                                    <Fieldset.Subtitle>
                                        <Textarea value={buffer} onChange={e => setBuffer(e.target.value)}>

                                        </Textarea>
                                    </Fieldset.Subtitle>
                                    <Fieldset.Footer>
                                        {new Date().toDateString()}
                                        <Button onClick={_e => saveBuffer()} auto scale={0.35}> Save </Button>
                                    </Fieldset.Footer>
                                </Fieldset>
                                <Spacer />
                            </>
                            : ""}
                        <Spacer />
                        {buffers.map((buffer, idx) => {
                            return (
                                <>
                                    <Note onClick={_ => {
                                        copy(buffer);
                                        toast("Copied to clipboard");
                                    }} label={false} key={idx}>
                                        {buffer}
                                    </Note>
                                    <Spacer />
                                </>
                            )
                        })}
                    </main>
                    : <div>
                        <h2>No notes yet!</h2>
                        {createBuffer ?

                            <>
                                <Fieldset>
                                    <Fieldset.Subtitle>
                                        <Textarea value={buffer} onChange={e => setBuffer(e.target.value)}>

                                        </Textarea>
                                    </Fieldset.Subtitle>
                                    <Fieldset.Footer>
                                        {new Date().toDateString()}
                                        <Button onClick={_e => saveBuffer()} auto scale={0.35}> Save </Button>
                                    </Fieldset.Footer>
                                </Fieldset>
                                <Spacer />
                            </>

                            : ""}
                        <Spacer />
                    </div>}
            </div>
            {/* new user modal */}
            <Modal visible={newUserModal} onClose={() => setNewUserModal(false)}>
                <Modal.Title>
                    Are you new ? Otherwise, enter your secret below
                </Modal.Title>
                <Modal.Content>
                    <Input clearable placeholder="Secret" value={newSecret} onChange={e => setNewSecret(e.target.value)} />
                    <Button onClick={_ => {
                        localStorage.setItem("secret", newSecret);
                        setToggleChange(!toggleChange);
                        setNewUserModal(false); // close modal
                    }}>
                        Save
                    </Button>
                </Modal.Content>
            </Modal>

            {/* settings modal */}
            <Modal visible={settings} onClose={() => setSettings(false)}>
                <Modal.Title>
                    Settings
                </Modal.Title>
                <Modal.Content style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                    <Input clearable placeholder="Secret" value={newSecret} onChange={e => setNewSecret(e.target.value)} />
                    <Spacer />
                    <Button onClick={_ => {
                        localStorage.setItem("secret", newSecret);
                        setToggleChange(!toggleChange);
                        setSettings(false); // close modal
                    }}>
                        Save
                    </Button>
                </Modal.Content>
            </Modal>
        </div >
    )
}

export default App;