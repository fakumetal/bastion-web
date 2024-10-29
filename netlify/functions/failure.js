// netlify/functions/failure.js
export async function handler(event) {
    console.log("Pago fallido:", event.queryStringParameters);

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: `
            <h1>Error en la reserva</h1>
            <p>Ocurrió un error al procesar el pago.</p>
        `
    };
}
