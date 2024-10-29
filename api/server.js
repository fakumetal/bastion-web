import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import cors from 'cors';
 
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-5750875078357351-102414-7b50697d9dc9b3998b7aa0ee104a9589-2055936542'
});
 
const app = express();
app.use(express.json());
app.use(cors());

 
app.post('/create_preference', async (req, res) => {
    const { reserva } = req.body;

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
                    success: 'http://localhost:3001/success',
                    failure: 'http://localhost:3000/failure',
                    pending: 'http://localhost:3000/pending',
                },
                auto_return: 'approved',
            },
        });
        res.json(preferenceData);
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
});
 
app.get('/success', (req, res) => {
    const { collection_id, collection_status, payment_id, status } = req.query;

 
    console.log("Pago exitoso:", {
        collection_id,
        collection_status,
        payment_id,
        status
    });
 
    res.redirect(`http://localhost:3000/success?payment_id=${payment_id}&status=${status}`);
});

 
app.get('/failure', (req, res) => {
 
    console.log("Pago fallido:", req.query);
 
    res.send(`
        <h1>Error en la reserva</h1>
        <p>Ocurrió un error al procesar el pago.</p>
    `);
});

// Endpoint para manejar el estado pendiente
app.get('/pending', (req, res) => {
   
    console.log("Pago pendiente:", req.query);
 
    res.send(`
        <h1>Pago Pendiente</h1>
        <p>Tu pago está en estado pendiente. Por favor verifica más tarde.</p>
    `);
});
 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
