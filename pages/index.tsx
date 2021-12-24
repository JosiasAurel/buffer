import React from "react";

import { Note, Tag, Button, Textarea, Fieldset, Spacer, Modal, Input, useClipboard } from "@geist-ui/react";
import { AlertCircle, Moon, Sun, Settings, Plus } from "@geist-ui/react-icons";

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
    const [info, setInfo] = React.useState<boolean>(false);

    // color mode
    const [dark, setDark] = React.useState<boolean>(false);

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
        setNewSecret(localStorage.getItem("secret"));
    }, [toggleChange]);


    return (
        <div>
            <header className={styles.header}>
                <span>
                    <Tag style={{
                        margin: "1em"
                    }}> Buffer.link </Tag>
                </span>
                <div className={styles.controls}>
                    <Button onClick={_e => setCreateBuffer(!createBuffer)} iconRight={<Plus />} auto scale={0.35} px={0.6} />
                    <Button iconRight={dark ? <Sun /> : <Moon />} auto scale={0.35} px={0.6} />
                    <Button onClick={() => {
                        setSettings(true);
                    }} iconRight={<Settings />} auto scale={0.35} px={0.6} />
                    <Button onClick={_e => setInfo(!info)} iconRight={<AlertCircle />} auto scale={0.35} px={0.6} />
                </div>

            </header>

            <div className={styles.buffers}>
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
                                    <Note style={{
                                        width: "80vw"
                                    }} onClick={_ => {
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
                    Are you new ?
                </Modal.Title>
                <Modal.Subtitle>
                    Enter your existing key to connect to a buffer or click create for a new buffer.
                </Modal.Subtitle>
                <Modal.Content style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                    <Input clearable placeholder="Secret" value={newSecret} onChange={e => setNewSecret(e.target.value)} />
                    <Spacer />
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                        <Button auto onClick={_ => {
                            localStorage.setItem("secret", newSecret);
                            setToggleChange(!toggleChange);
                            setNewUserModal(false); // close modal
                        }}>
                            Connect
                        </Button>
                        <Spacer />
                        <Button auto onClick={_ => {
                            const { newSecurityKey } = createKey();
                            localStorage.setItem("secret", newSecurityKey);
                            setToggleChange(!toggleChange);
                            setNewUserModal(false); // close modal
                        }}>
                            Create
                        </Button>
                    </div>
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

            {/* info modal */}
            <Modal visible={info} onClose={() => setInfo(false)}>
                <Modal.Title>
                    Buffered.link
                </Modal.Title>
                <Modal.Subtitle>
                    Why Buffered.link ?
                </Modal.Subtitle>
                <Modal.Content>
                    <p>
                        If you are like <a target="_blank" href="https://josiasw.dev">me</a> and a good
                        number of times, need to transfer text from your phone to your computer and vice versa,
                        then buffered.link might be the solution you need.
                    </p>
                    <p>
                        Buffered.link is a simple tool that allows you to share text
                        between connected by simply pasting the text in here. <br />
                        The buffer is refreshed every 5 seconds so you won't need to refresh the page to get the lastest
                        saves.
                    </p>
                    <p>
                        This tool is fully open source. <br />
                        If you found any issues and want to file a bug, or you
                        just want to contribute to improve this tool, you can find the entire codebase <a href="https://github.com/JosiasAurel/buffer">here</a>.
                    </p>
                </Modal.Content>
            </Modal>
        </div >
    )
}

export default App;