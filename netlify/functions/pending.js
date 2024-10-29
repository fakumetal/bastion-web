// netlify/functions/pending.js
export async function handler(event) {
    console.log("Pago pendiente:", event.queryStringParameters);

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: `
            <h1>Pago Pendiente</h1>
            <p>Tu pago está en estado pendiente. Por favor verifica más tarde.</p>
        `
    };
}
