import React, { useState, useEffect } from "react";
import { makeKeyPair } from "../utils/keys";
const App: React.FC = (): JSX.Element => {

  const [secret, setSecret] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");

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

  });
  return (
    <div>

    </div>
  )
}

export default App;