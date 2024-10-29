export async function handler(event) {
    const { payment_id, status } = event.queryStringParameters;

    console.log("Pago exitoso:", {
        collection_id,
        collection_status,
        payment_id,
        status
    });
    const redirectUrl = `http://localhost:3000/success?payment_id=${payment_id}&status=${status}`;
    return {
        statusCode: 302,
        headers: {
            Location: redirectUrl,
        },
    };
};
