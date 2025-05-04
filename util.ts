// src/util.ts or src/util.js
export async function getResponse(text: string) {
    const response = await fetch('http://localhost:5000/api/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data.result;
}
