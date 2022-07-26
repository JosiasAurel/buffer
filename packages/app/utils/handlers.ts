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

function createBuffer(buffer: BufferParam): Promise<BResponse | string> {
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

export { createBuffer };
