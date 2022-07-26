import React, { useState, useEffect } from "react";
import {
  Modal,
  Textarea,
  useModal,
  Select,
  Spacer,
  Toggle,
} from "@geist-ui/core";
import { makeKeyPair, hashKey } from "../utils/keys";
import styles from "../styles/app.module.css";
import Buffer from "../components/Buffer";
import toast from "react-hot-toast";
import { createBuffer, fetchBuffers } from "../utils/handlers";

let modalActions: any = {};

const App: React.FC = (): JSX.Element => {
  const [secret, setSecret] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");

  // modals
  const {
    visible: crVisible,
    setVisible: crSetVisible,
    bindings: crBindings,
  } = useModal();

  modalActions.createModalVisible = (bVal) => crSetVisible(bVal);

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
        .catch(e_ => toast.error("Failed to fetch buffer"));

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

    toast.promise(createBuffer(payload), {
      success: "Buffer Saved",
      error: "Failed to save buffer",
      loading: "Saving...",
    });
  }
  return (
    <div>
      <div className={styles.buffers}>
        {buffers.map(item => (
          <Buffer
            key={item.id}
            content={item.content}
            type={item.type}
            date={item.date}
          />
        ))}
      </div>
      <button onClick={(_) => crSetVisible(true)}>Create Buffer</button>
      <Modal {...crBindings}>
        <Modal.Title>Create Buffer</Modal.Title>
        <Modal.Content className={styles.centerContentCol}>
          <Select
            placeholder="Plain Text"
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
        <Modal.Action passive onClick={(_) => crSetVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action onClick={(_) => saveBuffer()}>Save</Modal.Action>
      </Modal>
    </div>
  );
};

export default App;

export { modalActions };
