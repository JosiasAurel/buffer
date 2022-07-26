import React, { useState, useEffect } from "react";
import { Modal, Textarea, useModal, Select, Spacer } from "@geist-ui/core";
import { makeKeyPair } from "../utils/keys";
import styles from "../styles/app.module.css";

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

  // create buffer state variables
  const [content, setContent] = useState<string>("");
  const [bufferType, setBufferType] = useState<string>("text");

  function textChangeHandler(event, handler): void {
    handler(event.target.value);
  }
  return (
    <div>
      <button onClick={(_) => crSetVisible(true)}>Create Buffer</button>
      <Modal {...crBindings}>
        <Modal.Title>Create Buffer</Modal.Title>
        <Modal.Content className={styles.centerContentCol}>
          <Select
            placeholder="Plain Text"
            onChange={(value) => setBufferType(value.toString())}
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
        </Modal.Content>
        <Modal.Action passive onClick={(_) => crSetVisible(false)}>
          Close
        </Modal.Action>
        <Modal.Action>Save</Modal.Action>
      </Modal>
    </div>
  );
};

export default App;

export { modalActions };
