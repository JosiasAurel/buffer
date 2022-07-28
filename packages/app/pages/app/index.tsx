import React, { useState, useEffect } from "react";
import {
  Modal,
  Textarea,
  useModal,
  Select,
  Spacer,
  Toggle,
  Card,
  Button,
  Grid,
  Input,
  useClipboard,
  Text,
  Tooltip
} from "@geist-ui/core";
import { Plus, Home, Github, Settings, Share2, Command } from "@geist-ui/react-icons";
import { makeKeyPair, hashKey } from "../../utils/keys";
import styles from "../../styles/app.module.css";
import Buffer from "../../components/Buffer";
import toast from "react-hot-toast";
import { createBuffer, fetchBuffers, updateBuffer } from "../../utils/handlers";
import { useRouter } from "next/router";
import Link from "next/link";
import { useKBar } from "kbar";

let modalActions: any = {};

const App: React.FC = (): JSX.Element => {
  const [secret, setSecret] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");

  const { copy } = useClipboard();
  const kbar = useKBar();
  // modals
  // modal for creating and updating buffer
  const { setVisible, bindings } = useModal();

  const { setVisible: sSetVisible, bindings: sBindings } = useModal();

  // default modal use
  const [modalUse, setModalUse] = useState<"Create" | "Edit">("Create");

  // buffer ID for use in Edit mode
  const [bufferId, setBufferId] = useState<string>("");

  modalActions.createModalVisible = (
    bVal: boolean | ((prevState: boolean) => boolean)
  ) => setVisible(bVal);

  modalActions.settingsModalVisible = (bVal: boolean) => sSetVisible(bVal);

  const router = useRouter();

  // load/create keypair on-load routine
  useEffect(() => {
    const localPk = localStorage.getItem("publicKey");
    const localSecret = localStorage.getItem("secret");

    if (localPk && localSecret) {
      setSecret(localSecret);
      setPublicKey(localPk);
    } else {
      // generate new key pair
      const { secretKey, publicKey } = makeKeyPair();

      // store the new key pair locally
      localStorage.setItem("publicKey", publicKey);
      localStorage.setItem("secret", secretKey);

      // store keypair in current state
      setSecret(secretKey);
      setPublicKey(publicKey);
    }
  }, []);

  // buffers container
  const [buffers, setBuffers] = useState<any[]>([]);

  useEffect(() => {
    if (secret.length > 0 && publicKey.length > 0) {
      // omit public key when the owner is identified
      fetchBuffers(hashKey(secret))
        .then((result: BResponse) => {
          setBuffers(result.buffers as any[]);
          toast.success("Fetched Buffers");
        })
        .catch((e_) => toast.error("Failed to fetch buffer"));
    }
  }, [secret, publicKey]);

  // create buffer state variables
  const [content, setContent] = useState<string>("");
  const [bufferType, setBufferType] = useState<"text" | "code">("text");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  // handle changes on text input elements
  function textChangeHandler(event, handler): void {
    handler(event.target.value);
  }

  // onClick handler for saving a new buffer
  function saveBuffer() {
    const payload: BufferParam = {
      content,
      isPublic,
      ownerHash: hashKey(secret),
      type: bufferType,
      publicKey,
    };

    toast.promise(
      createBuffer(payload).then((result: BResponse) => {
        setBuffers([...buffers, result.buffer]);
        setVisible(false);
        setContent("");
        setBufferType("text");
        setIsPublic(false);
      }),
      {
        success: "Buffer Saved",
        error: "Failed to save buffer",
        loading: "Saving...",
      }
    );
    //.then((_) => router.reload());
  }

  function editBufferTrigger(
    id: string,
    type: "text" | "code",
    content: string,
    isPublic: boolean
  ): void {
    setVisible(true); // open the modal

    // set the params of the buffer
    setBufferType(type);
    setContent(content);
    setIsPublic(isPublic);
    setBufferId(id);
    setModalUse("Edit");
  }

  function editBuffer() {
    toast
      .promise(
        updateBuffer(bufferId, content, bufferType, isPublic).then(
          (result: BResponse) => {
            // setBuffers([...buffers, result.buffer]);
            setVisible(false);
            setContent("");
            setBufferType("text");
            setIsPublic(false);
          }
        ),
        {
          success: "Buffer Updated",
          error: "Failed to update buffer",
          loading: "Saving...",
        }
      )
      .then((_) => setModalUse("Create"))
      .then((_) => router.reload());
  }
  return (
    <div className={styles.buffersPage}>
      <div className={styles.buffers}>
        {buffers.length > 0 ?
          <Grid.Container
            gap={1.5}
            justify="center"
            style={{ overflowY: "scroll", width: "100%", height: "100%" }}
          >
            {buffers.map((item) => (
              <Grid key={item.id}>
                <Buffer
                  content={item.content}
                  type={item.type}
                  date={item.date}
                  isPublic={item.isPublic}
                  id={item.id}
                  expiryDate={item.expiryDate}
                  editHandler={(_: any) =>
                    editBufferTrigger(
                      item.id,
                      item.type,
                      item.content,
                      item.isPublic
                    )
                  }
                />
              </Grid>
            ))}
          </Grid.Container>
          :
          <Grid.Container
            gap={1.5}
            justify="center"
            style={{ overflowY: "scroll", width: "100%", height: "100%" }}
          >
            <Grid>
              <Text>Click on the <Plus /> icon to create a new buffer</Text>
            </Grid>
          </Grid.Container>}
      </div>
      <Card className={styles.fab}>
        <Button
          auto
          scale={0.35}
          px={0.6}
          icon={<Plus />}
          onClick={(_) => setVisible(true)}
        />
        <Spacer />
        <Tooltip placement="left" text="You can also activate the menu with CTRL+K or COMMAND+K">
          <Button
            auto
            scale={0.35}
            px={0.6}
            icon={<Command />}
            onClick={(_) => kbar.query.toggle()}
          />
        </Tooltip>
        <Spacer />
        <Button
          auto
          scale={0.35}
          px={0.6}
          icon={<Home />}
          onClick={(_) => router.replace("/")}
        />
        <Spacer />
        <Link href="https://github.com/JosiasAurel/buffer">
          <Button auto scale={0.35} px={0.6} icon={<Github />} />
        </Link>
        <Spacer />
        <Button
          onClick={(_) => {
            copy(`https://buffered.link/${publicKey}`);
            toast("Copied Public Buffer to Clipboard", { icon: "📎" });
          }}
          auto
          scale={0.35}
          px={0.6}
          icon={<Share2 />}
        />
        <Spacer />
        <Button
          onClick={(_) => sSetVisible(true)}
          auto
          scale={0.35}
          px={0.6}
          icon={<Settings />}
        />
      </Card>

      {/* modal for settings */}
      <Modal {...sBindings}>
        <Modal.Title> Settings </Modal.Title>
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            onChange={(e) => textChangeHandler(e, setSecret)}
            clearable
            value={secret}
            placeholder="Your Secret"
          />
          <Spacer />
          <Input
            onChange={(e) => textChangeHandler(e, setPublicKey)}
            clearable
            value={publicKey}
            placeholder="Your Public Key"
          />
        </Modal.Content>
        <Modal.Action passive onClick={(_) => sSetVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action
          onClick={(_) => {
            localStorage.setItem("secret", secret);
            localStorage.setItem("publicKey", publicKey);

            router.reload();
          }}
        >
          Save
        </Modal.Action>
      </Modal>

      {/* modal for creating & updating buffer */}
      <Modal {...bindings}>
        <Modal.Title>{modalUse} Buffer</Modal.Title>
        <Modal.Content className={styles.centerContentCol}>
          <Select
            placeholder="Text Type"
            defaultValue={"text"}
            onChange={(value) => setBufferType(value as "text" | "code")}
          >
            <Select.Option value="text">Plain Text</Select.Option>
            <Select.Option value="code">Code</Select.Option>
          </Select>
          <Spacer />
          <Textarea
            cols={30}
            rows={10}
            value={content}
            onChange={(event) => textChangeHandler(event, setContent)}
            placeholder="Enter/Paste text in here..."
          />
          <Spacer />
          <span style={{ width: "100%" }} className={styles.centerContentRow}>
            <p>Public</p>
            <Toggle
              checked={isPublic}
              onChange={(_) => setIsPublic(!isPublic)}
              initialChecked={false}
            />
          </span>
        </Modal.Content>
        <Modal.Action passive onClick={(_) => setVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action
          onClick={(_) => {
            if (modalUse === "Create") saveBuffer();
            if (modalUse === "Edit") editBuffer();
          }}
        >
          Save
        </Modal.Action>
      </Modal>
    </div>
  );
};

export default App;

export { modalActions };
