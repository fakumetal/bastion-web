// MiReserva.tsx
"use client"
import { useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { appFirebase } from '../../../../firebase';
import styles from './MiReserva.module.scss';
import { Typography } from '@/components/common';

const db = getFirestore(appFirebase);

const MiReserva: React.FC = () => {
    const [paymentId, setPaymentId] = useState<string>('');
    const [reservaData, setReservaData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentId(e.target.value);
    };

    const buscarReserva = async () => {
        if (!paymentId) {
            setError('Por favor ingresa un número de reserva válido.');
            return;
        }

        try {
            const reservasRef = collection(db, 'reservas');
            const reservaQuery = query(reservasRef, where("paymentId", "==", paymentId));
            const querySnapshot = await getDocs(reservaQuery);

            if (!querySnapshot.empty) {
                const data = querySnapshot.docs[0].data();
                setReservaData(data);
                setError(null);
            } else {
                setReservaData(null);
                setError('No se encontró una reserva con ese número.');
            }
        } catch (err) {
            console.error('Error al buscar la reserva:', err);
            setError('Hubo un error al buscar la reserva. Intenta nuevamente.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Buscar Reserva</h1>
            <div className={styles.form}>
                <input
                    type="text"
                    value={paymentId}
                    onChange={handleInputChange}
                    placeholder="Ingresa el número de reserva"
                />
                <button onClick={buscarReserva}>Buscar</button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {reservaData && (
                <div className={styles.reservaDetails}>
                    <h2>Detalles de la Reserva</h2>
                    <ul>
                        <li><strong>Nombre:</strong> {reservaData.nombre}</li>
                        <li><strong>Teléfono:</strong> {reservaData.telefono}</li>
                        <li><strong>Email:</strong> {reservaData.email}</li>
                        <li><strong>Cantidad de Personas:</strong> {reservaData.cantidadPersonas}</li>
                        <li><strong>Chocolates:</strong> {reservaData.chocolates ? 'Sí' : 'No'}</li>
                        <li><strong>Toallones:</strong> {reservaData.toallones}</li>
                        <li><strong>Toallas:</strong> {reservaData.toallas}</li>
                        <li><strong>Total:</strong> ${reservaData.total}</li>
                        <li><strong>Fecha de Inicio:</strong> {reservaData.startDate}</li>
                        <li><strong>Fecha de Fin:</strong> {reservaData.endDate}</li>
                    </ul>
                </div>
        
            )}
       
            
        </div>
    );
};

export default MiReserva;
