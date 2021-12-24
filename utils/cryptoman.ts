const { createHash } = require("crypto");
const { nanoid } = require("nanoid");

interface CreateKeyResult {
    newSecurityKey: string
    result: string
}

function createKey(): CreateKeyResult {
    const newSecurityKey = nanoid(5);
    const result = createHash("sha256")
                    .update(newSecurityKey)
                    .digest("hex");
    return { newSecurityKey, result };
}

function hashKey(securityKey: string): string {
    const result = createHash("sha256")
                    .update(securityKey)
                    .digest("hex");
    return result;
}

export {
    createKey,
    hashKey
};