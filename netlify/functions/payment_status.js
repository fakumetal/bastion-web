// Usa import en lugar de require
export async function handler(event) {
    const paymentId = event.queryStringParameters.id;

    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: {
                Authorization: `Bearer APP_USR-5750875078357351-102414-7b50697d9dc9b3998b7aa0ee104a9589-2055936542`, // Reemplaza con tu Access Token de MercadoPago
            },
        });

        const paymentData = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(paymentData),
        };
    } catch (error) {
        console.error("Error fetching payment status: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error fetching payment status" }),
        };
    }
}
