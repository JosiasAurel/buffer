import React from "react";

import {
  Note,
  Tag,
  Button,
  Textarea,
  Fieldset,
  Spacer,
  Modal,
  Input,
  useClipboard,
} from "@geist-ui/react";
import { AlertCircle, RefreshCcw, Settings, Plus } from "@geist-ui/react-icons";

import { createKey, hashKey } from "../utils/cryptoman";
import { makeRequest } from "../utils/request";

import toast from "react-hot-toast";

import styles from "../styles/index.module.css";

import Head from "next/head";

const App: React.FC = (): JSX.Element => {
  const [newUserModal, setNewUserModal] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<boolean>(false);
  const [secret, setSecret] = React.useState<string>("");
  const [newSecret, setNewSecret] = React.useState<string>(secret);
  const [buffer, setBuffer] = React.useState<string>("");
  const [buffers, setBuffers] = React.useState<Array<string>>([]);
  const [createBuffer, setCreateBuffer] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<boolean>(false);

  // clipboard
  const { copy } = useClipboard();

  function saveBuffer() {
    const hashedKey = hashKey(secret);
    toast.promise(
      makeRequest(`/api/save`, { buffer, key: hashedKey }).then((_) =>
        setBuffer("")
      ),
      {
        loading: "Bufferizing...",
        success: "Buffered",
        error: "Failed to buffer",
      }
    );
    setCreateBuffer(false);
    getBuffers();
  }

  async function refreshBuffers() {
    const secret = localStorage.getItem("secret");
    const hashedKey = hashKey(secret);
    const newBuffers = await makeRequest("/api/buffers", { key: hashedKey });
    const clientBuffers: Array<string> = [];
    newBuffers?.fetchedBuffers.forEach((buffer) =>
      clientBuffers.push(buffer.buffer)
    );

    /* console.log("clientBuffers", clientBuffers);
        console.log("buffers", buffers); */
    const allEqual: boolean =
      clientBuffers.length === buffers.length &&
      clientBuffers.every((buffer_, idx) => buffer_ === buffers[idx]);

    if (!allEqual) {
      console.log("Not equal");
      console.table({ clientBuffers, buffers });
      toast("New Buffer");
      return setBuffers(clientBuffers);
    }
    return;
  }
  function getBuffers() {
    const secret = localStorage.getItem("secret");
    const hashedKey = hashKey(secret);
    toast.promise(
      makeRequest("/api/buffers", { key: hashedKey }).then((result: any) => {
        // console.log("result", result);
        const clientBuffers: Array<string> = [];
        result?.fetchedBuffers.map((buffer) =>
          clientBuffers.push(buffer.buffer)
        );
        // console.log("clientBuffers", clientBuffers);
        setBuffers(clientBuffers);
      }),
      {
        loading: "Loading Buffer",
        success: "Got your buffer",
        error: "Failed to load Buffer",
      }
    );
  }

  React.useEffect(() => {
    const localSecret = localStorage.getItem("secret") ?? undefined;
    // console.log("localSecret", localSecret);
    if (localSecret) {
      setSecret(localSecret);
      setNewSecret(localSecret);
      getBuffers();
    } else {
      setNewUserModal(true);
    }
    // setNewSecret(localStorage.getItem("secret"));
  }, []);

  return (
    <div>
      <Head>
        <title>Your text buffer</title>
        <meta name="title" content="Your text buffer" />
        <meta
          name="description"
          content="Buffered.link is a simple tool that allows you to share text between connected by simply pasting the text in here."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buffered.link/" />
        <meta property="og:title" content="Your text buffer" />
        <meta
          property="og:description"
          content="Buffered.link is a simple tool that allows you to share text between connected by simply pasting the text in here."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/3pKTH9n/Buffered-link-1.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://buffered.link/" />
        <meta property="twitter:title" content="Your text buffer" />
        <meta
          property="twitter:description"
          content="Buffered.link is a simple tool that allows you to share text between connected by simply pasting the text in here."
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/3pKTH9n/Buffered-link-1.png"
        />
      </Head>
      <header className={styles.header}>
        <span>
          <Tag
            style={{
              margin: "1em",
            }}
          >
            {" "}
            Buffered.link{" "}
          </Tag>
        </span>
        <div className={styles.controls}>
          <Button
            onClick={(_e) => refreshBuffers()}
            iconRight={<RefreshCcw />}
            auto
            scale={0.35}
            px={0.6}
          />
          <Button
            onClick={(_e) => setCreateBuffer(!createBuffer)}
            iconRight={<Plus />}
            auto
            scale={0.35}
            px={0.6}
          />
          <Button
            onClick={() => {
              setSettings(true);
            }}
            iconRight={<Settings />}
            auto
            scale={0.35}
            px={0.6}
          />
          <Button
            onClick={(_e) => setInfo(!info)}
            iconRight={<AlertCircle />}
            auto
            scale={0.35}
            px={0.6}
          />
        </div>
      </header>

      <div className={styles.buffers}>
        <Spacer h={3} />
        {buffers.length > 0 ? (
          <main>
            {createBuffer ? (
              <>
                <Fieldset width={"80vw"}>
                  <Fieldset.Subtitle>
                    <Textarea
                      width="100%"
                      rows={5}
                      value={buffer}
                      onChange={(e) => setBuffer(e.target.value)}
                    ></Textarea>
                  </Fieldset.Subtitle>
                  <Fieldset.Footer>
                    {new Date().toDateString()}
                    <Button onClick={(_e) => saveBuffer()} auto scale={0.35}>
                      {" "}
                      Save{" "}
                    </Button>
                  </Fieldset.Footer>
                </Fieldset>
                <Spacer />
              </>
            ) : (
              ""
            )}
            <Spacer />
            {buffers.map((buffer, idx) => {
              return (
                <>
                  <Note
                    style={{
                      width: "80vw",
                    }}
                    onClick={(_) => {
                      copy(buffer);
                      toast("Copied to clipboard");
                    }}
                    label={false}
                    key={idx}
                  >
                    {buffer}
                  </Note>
                  <Spacer />
                </>
              );
            })}
          </main>
        ) : (
          <div>
            <h2>Empty Buffer</h2>
            {createBuffer ? (
              <>
                <Fieldset width={"80vw"}>
                  <Fieldset.Subtitle>
                    <Textarea
                      width="100%"
                      rows={5}
                      value={buffer}
                      onChange={(e) => setBuffer(e.target.value)}
                    ></Textarea>
                  </Fieldset.Subtitle>
                  <Fieldset.Footer>
                    {new Date().toDateString()}
                    <Button onClick={(_e) => saveBuffer()} auto scale={0.35}>
                      {" "}
                      Save{" "}
                    </Button>
                  </Fieldset.Footer>
                </Fieldset>
                <Spacer />
              </>
            ) : (
              ""
            )}
            <Spacer />
          </div>
        )}
      </div>
      {/* new user modal */}
      <Modal visible={newUserModal} onClose={() => setNewUserModal(false)}>
        <Modal.Title>Are you new ?</Modal.Title>
        <Modal.Subtitle>
          Enter your existing key to connect to a buffer or click create for a
          new buffer.
        </Modal.Subtitle>
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Input
            clearable
            placeholder="Secret"
            value={newSecret}
            onChange={(e) => setNewSecret(e.target.value)}
          />
          <Spacer />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              auto
              onClick={(_) => {
                localStorage.setItem("secret", newSecret);
                refreshBuffers();
                setNewUserModal(false); // close modal
              }}
            >
              Connect
            </Button>
            <Spacer />
            <Button
              auto
              onClick={(_) => {
                const { newSecurityKey } = createKey();
                localStorage.setItem("secret", newSecurityKey);
                setSecret(newSecurityKey);
                setNewSecret(newSecurityKey);
                refreshBuffers();
                setNewUserModal(false); // close modal
              }}
            >
              Create
            </Button>
          </div>
        </Modal.Content>
      </Modal>

      {/* settings modal */}
      <Modal visible={settings} onClose={() => setSettings(false)}>
        <Modal.Title>Settings</Modal.Title>
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Input
            clearable
            placeholder="Secret"
            value={newSecret}
            onChange={(e) => setNewSecret(e.target.value)}
          />
          <Spacer />
          <Button
            onClick={(_) => {
              localStorage.setItem("secret", newSecret);
              refreshBuffers();
              setSettings(false); // close modal
            }}
          >
            Save
          </Button>
        </Modal.Content>
      </Modal>

      {/* info modal */}
      <Modal visible={info} onClose={() => setInfo(false)}>
        <Modal.Title>Buffered.link</Modal.Title>
        <Modal.Subtitle>Why Buffered.link ?</Modal.Subtitle>
        <Modal.Content>
          <p>
            If you are like{" "}
            <a target="_blank" href="https://josiasw.dev">
              me
            </a>{" "}
            and a good number of times, need to transfer text from your phone to
            your computer and vice versa, then buffered.link might be the
            solution you need.
          </p>
          <p>
            Buffered.link is a simple tool that allows you to share text between
            connected by simply pasting the text in here. <br />
          </p>
          <p>
            This tool is fully open source. <br />
            If you found any issues and want to file a bug, or you just want to
            contribute to improve this tool, you can find the entire codebase{" "}
            <a href="https://github.com/JosiasAurel/buffer">here</a>.
          </p>

          <div>
            <h2 style={{ textAlign: "center" }}>Mini Guide</h2>
            <ul>
              <li>Click on a buffer to copy its content</li>
              <li>You can change the secret to connect to another buffer in settings.</li>
              <li>Create a new buffer by clicking the plus icon</li>
            </ul>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default App;
