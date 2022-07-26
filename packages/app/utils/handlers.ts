
async function makeRequest(endpoint: string, requestBody: any): Promise<BResponse> {
    const response = await fetch(endpoint, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    const result: BResponse = await response.json();
    
    return result;
}

async function createBuffer(buffer: BufferParam) {
    const { status } = await makeRequest("/api/save", buffer);
    return status;
}

export {
    createBuffer
};