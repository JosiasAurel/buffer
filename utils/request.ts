
async function makeRequest(endpoint: string, body: any): Promise<any> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const result = await response.json();
    return result;
}

export { makeRequest };