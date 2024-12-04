 

import axios from 'axios';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { appFirebase } from '../../src/firebase';

 
const db = getFirestore(appFirebase);

 
const saveReservaToFirestore = async (reservaData) => {
    try {
        // Comprobar que los datos sean correctos antes de enviarlos
        if (!reservaData.nombre || !reservaData.telefono || !reservaData.paymentId) {
            throw new Error("Datos de la reserva incompletos.");
        }

        // Convertir la fecha a un objeto Date si no lo es
        const createdAt = reservaData.createdAt instanceof Date ? reservaData.createdAt : new Date(reservaData.createdAt);

        // Guardar los datos en Firestore
        const docRef = await addDoc(collection(db, 'reservas'), {
            ...reservaData,
            createdAt
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al guardar la reserva en Firestore:", error);
        throw new Error("Error al guardar la reserva.");
    }
};
const handler = async (event) => {
    const { paymentId, status } = JSON.parse(event.body);  

    if (status === 'approved') {
        try { 
            const paymentResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,  
                },
            });

            if (paymentResponse.data.status === 'approved') {
        
                const reservaData = {
                    nombre: 'Nombre del usuario', 
                    telefono: 'Teléfono del usuario',
                    paymentId,
                    status: paymentResponse.data.status,
                    createdAt: new Date(),
                };

       
                const reservaId = await saveReservaToFirestore(reservaData);

                return {
                    statusCode: 200,
                    body: JSON.stringify({ success: true, reservaId }),
                };
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ success: false, message: "Pago no aprobado por MercadoPago" }),
                };
            }
        } catch (error) {
            console.error("Error al verificar el pago:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Error al verificar el pago" }),
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: "Pago no aprobado" }),
        };
    }
};

export { handler };
