import { MercadoPagoConfig, Preference } from 'mercadopago';

// Inicializa MercadoPago con tu token de acceso

 
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const handler = async (event) => {
    const { reserva } = JSON.parse(event.body);

    const preference = new Preference(client);

    try {
        const preferenceData = await preference.create({
            body: {
                items: [
                    {
                        title: 'Reserva',
                        quantity: 1,
                        unit_price: reserva,
                    },
                ],
                back_urls: {
                    
                    success: 'http://localhost:8888/success',
                    failure: 'http://localhost:8888/failure',
                    pending: 'http://localhost:8888/pending',
                },
                auto_return: 'approved',
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(preferenceData),
        };
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al crear la preferencia' }),
        };
    }
};

export { handler };
