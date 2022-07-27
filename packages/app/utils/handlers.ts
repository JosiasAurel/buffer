async function makeRequest(
  endpoint: string,
  requestBody: any
): Promise<BResponse> {
  const response = await fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const result: BResponse = await response.json();

  return result;
}

function createBuffer(
  buffer: BufferParam
): Promise<BResponse | BResponse[] | string> {
  return new Promise((resolve, reject) => {
    makeRequest("/api/save", buffer)
      .then((result) => {
        if (result.status) {
          resolve(result);
        } else reject("Failed");
      })
      .catch((error) => reject("Failed"));
  });
}

function fetchBuffers(
  ownerHash?: string,
  publicKey?: string
): Promise<BResponse | string> {
  return new Promise((resolve, reject) => {
    makeRequest("/api/buffers", { ownerHash, publicKey })
      .then((result) => {
        if (result.status) {
          resolve(result);
        } else reject("Failed");
      })
      .catch((_) => reject("Failed"));
  });
}

function deleteBuffer(bufferId: string): Promise<BResponse | string> {
  return new Promise((resolve, reject) => {
    makeRequest("/api/delete", { bufferId })
      .then((result) => {
        if (result.status) {
          resolve(result);
        } else reject("Failed");
      })
      .catch((e_) => reject("Failed"));
  });
}

function updateBuffer(
  bufferId: string,
  content: string,
  type: BufferType,
  isPublic: boolean
): Promise<BResponse | string> {
  return new Promise((resolve, reject) => {
    makeRequest("/api/update", {
      bufferId,
      content,
      type,
      isPublic,
    })
      .then((result) => {
        if (result.status) {
          resolve(result);
        } else reject("Failed");
      })
      .catch((_) => reject("Failed"));
  });
}

function refreshBuffer(bufferId: string): Promise<BResponse | string> {
  return new Promise((resolve, reject) => {
    makeRequest("/api/refresh", { bufferId })
      .then((result) => {
        if (result.status) {
          resolve(result);
        } else reject("Failed");
      })
      .catch((_) => reject("Failed"));
  });
}

export {
  createBuffer,
  fetchBuffers,
  deleteBuffer,
  updateBuffer,
  refreshBuffer,
};
