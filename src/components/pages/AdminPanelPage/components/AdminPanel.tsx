'use client';

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { appFirebase } from '@/firebase'; // Asegúrate de que esta ruta sea correcta
import styles from './adminPanel.module.scss'; // Asegúrate de que la ruta sea correcta

interface Reserva {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    startDate: string;  
    endDate: string;   
    cantidadPersonas: number;
    toallas: number;
    toallones: number;
    chocolates: number;
}

// Función para convertir fecha de formato "DD/MM/YYYY" a objeto Date
const convertirFecha = (fecha: string) => {
    const [dia, mes, anio] = fecha.split('/').map(Number);
    return new Date(anio, mes - 1, dia); // mes - 1 porque los meses son 0-indexados
};

const AdminPanel = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [mesSeleccionado, setMesSeleccionado] = useState<string>(''); // Estado para el mes seleccionado

    useEffect(() => {
        const fetchReservas = async () => {
            const db = getFirestore(appFirebase);
            const reservasCollection = collection(db, 'reservas');
            const reservasSnapshot = await getDocs(reservasCollection);
            const reservasList = reservasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Reserva[];
            console.log('Reservas obtenidas:', reservasList); // Ver reservas
            setReservas(reservasList);
        };

        fetchReservas();
    }, []);

    // Filtrar reservas por mes
    const filtrarReservasPorMes = () => {
        if (!mesSeleccionado) return reservas; // Si no se selecciona ningún mes, devuelve todas las reservas

        const mesSeleccionadoDate = new Date(mesSeleccionado); // mesSeleccionado debe ser en formato "YYYY-MM-DD"
        const mes = mesSeleccionadoDate.getMonth(); // Obtener el mes (0-11)
        const anio = mesSeleccionadoDate.getFullYear(); // Obtener el año

        console.log('Mes seleccionado:', mes + 1, 'Año:', anio); // Mostrar mes y año seleccionados

        const reservasFiltradas = reservas.filter(reserva => {
            const startDate = convertirFecha(reserva.startDate); // Convertir a objeto Date
            console.log('Reserva:', reserva.nombre, 'Start Date:', startDate); // Ver cada reserva y su fecha de inicio
            return startDate.getMonth() === mes && startDate.getFullYear() === anio; // Filtrar por mes y año
        });

        console.log('Reservas filtradas:', reservasFiltradas); // Ver reservas filtradas
        return reservasFiltradas;
    };

    const reservasFiltradas = filtrarReservasPorMes();

    return (
        <div>
            <h2>Panel de Administración - Reservas</h2>
            <label htmlFor="mes">Selecciona un mes:</label>
            <select
                id="mes"
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(e.target.value)}
            >
                <option value="">Todos</option>
                {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={`2024-${index + 2}-01`}>
                        {new Date(2024, index).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            <table className={styles.reservasTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Cantidad de Personas</th>
                        <th>Toallas</th>
                        <th>Toallones</th>
                        <th>Chocolates</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasFiltradas.length > 0 ? (
                        reservasFiltradas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{reserva.nombre}</td>
                                <td>{reserva.email}</td>
                                <td>{reserva.telefono}</td>
                                <td>{reserva.startDate}</td>
                                <td>{reserva.endDate}</td>
                                <td>{reserva.cantidadPersonas}</td>
                                <td>{reserva.toallas}</td>
                                <td>{reserva.toallones}</td>
                                <td>{reserva.chocolates}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9}>No hay reservas para mostrar.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
