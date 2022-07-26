const { createHash } = require("crypto");
const { nanoid } = require("nanoid");

function makeKeyPair() {
  const secretKey = nanoid(7);
  const publicKey = nanoid(7);

  return {
    secretKey, publicKey
  }
}

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export { makeKeyPair, hashKey };
