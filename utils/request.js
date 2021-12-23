
async function makeRequest(endpoint, method, body) {
    if (method === "GET") {
        const response = await fetch(endpoint);
        const result = await response.json();
        return result;
    }
    const response = await fetch(endpoint, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const result = await response.json();
    return result;
}

export { makeRequest };