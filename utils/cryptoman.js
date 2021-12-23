const { createHash } = require("crypto");
const { nanoid } = require("nanoid");

function createKey() {
    const newSecurityKey = nanoid(5);
    const result = createHash("sha256")
                    .update(newSecurityKey)
                    .digest("hex");
    return { newSecurityKey, result };
}

function connectWithKey(securityKey) {
    const result = createHash("sha256")
                    .update(securityKey)
                    .digest("hex");
    return result;
}

export {
    createKey,
    connectWithKey
};