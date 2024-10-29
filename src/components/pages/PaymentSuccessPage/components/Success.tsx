'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { appFirebase } from '../../../../firebase';
import styles from './successPage.module.scss';

const db = getFirestore(appFirebase);

const saveReservaToFirestore = async (reservaData: any) => {
    try {
        const docRef = await addDoc(collection(db, 'reservas'), reservaData);
        console.log('Reserva guardada con ID: ', docRef.id);
        return true;
    } catch (error) {
        console.error("Error al guardar la reserva en Firestore: ", error);
        alert("Error al guardar la reserva. Intenta nuevamente.");
        return false;
    }
};

const Success = () => {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const [reservaData, setReservaData] = useState<any>(null);
    const [isReservaGuardada, setIsReservaGuardada] = useState(false);

    useEffect(() => {
     
        if (status === 'approved' && paymentId    ) {
            const storedReservaData = localStorage.getItem('reservaData');

            if (storedReservaData) {
                try {
                    const parsedData = JSON.parse(storedReservaData);
 
                    if (parsedData.nombre && parsedData.telefono) {
                        const reservaDataCompleta = {
                            ...parsedData,
                            paymentId,
                            status,
                            createdAt: new Date(),
                        };

                        saveReservaToFirestore(reservaDataCompleta).then(success => {
                            if (success) {
                                setReservaData(reservaDataCompleta);
                                setIsReservaGuardada(true);
                            }
                        });
                    } else {
                        console.error("Datos de reserva incompletos en localStorage.");
                        alert("Datos de reserva incompletos. Por favor, intenta nuevamente.");
                    }
                } catch (error) {
                    console.error("Error al parsear los datos de reserva del localStorage:", error);
                    alert("Ocurrió un error al procesar la reserva. Intenta nuevamente.");
                }
            }
        }

        return () => {
            localStorage.removeItem('reservaData');
        };
    }, [paymentId, status]);

    return (
        <div className={styles.successPage}>
            <h1>Reserva Exitosa</h1>
            {isReservaGuardada && reservaData && (
                <div className={styles.reservaData}>
                    <p>Tu reserva ha sido confirmada y guardada en nuestro sistema.</p>
                    <p><strong>Nombre:</strong> {reservaData.nombre}</p>
                    <p><strong>Teléfono:</strong> {reservaData.telefono}</p>
                    <p><strong>ID de Pago:</strong> {reservaData.paymentId}</p>
                    <p><strong>Fecha de Creación:</strong> {reservaData.createdAt.toLocaleString()}</p>
                </div>
            )}
            <span style={{ marginTop: '15px', color: 'red' }}>Con el ID de Pago podrá ver su reserva en la sección "Mi reserva"</span>
        </div>
    );
};

export default Success;
