'use client';

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { appFirebase } from '@/firebase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import styles from './adminPanel.module.scss';

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

const convertirFecha = (fecha: string) => {
    const [dia, mes, anio] = fecha.split('/').map(Number);
    return new Date(anio, mes - 1, dia);
};

const AdminPanel = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [mesSeleccionado, setMesSeleccionado] = useState<string>('');

    useEffect(() => {
        const fetchReservas = async () => {
            const db = getFirestore(appFirebase);
            const reservasCollection = collection(db, 'reservas');
            const reservasSnapshot = await getDocs(reservasCollection);
            const reservasList = reservasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Reserva[];
            setReservas(reservasList);
        };

        fetchReservas();
    }, []);

    const filtrarReservasPorMes = () => {
        if (!mesSeleccionado) return reservas;
        const mesSeleccionadoDate = new Date(mesSeleccionado);
        const mes = mesSeleccionadoDate.getMonth();
        const anio = mesSeleccionadoDate.getFullYear();
        return reservas.filter(reserva => {
            const startDate = convertirFecha(reserva.startDate);
            return startDate.getMonth() === mes && startDate.getFullYear() === anio;
        });
    };

    const reservasFiltradas = filtrarReservasPorMes();

    const eliminarReserva = async (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
            try {
                const db = getFirestore(appFirebase);
                await deleteDoc(doc(db, 'reservas', id));
                setReservas(reservas.filter(reserva => reserva.id !== id));
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
            }
        }
    };

    const descargarPDF = () => {
        const doc = new jsPDF();
        doc.text('Reservas', 14, 16);
      
        autoTable(doc, {
            head: [['Nombre', 'Email', 'Teléfono', 'Inicio', 'Fin', 'Personas', 'Toallas', 'Toallones', 'Chocolates']],
            body: reservasFiltradas.map(reserva => [
                reserva.nombre,
                reserva.email,
                reserva.telefono,
                reserva.startDate,
                reserva.endDate,
                reserva.cantidadPersonas,
                reserva.toallas,
                reserva.toallones,
                reserva.chocolates,
            ]),
            startY: 20,
            styles: {
                fontSize: 8,  
            },
            
        });
      
        doc.save('reservas.pdf');
    };
    

    return (
        <div className={styles.adminPanel}>
            <h2>Panel de Administración - Reservas</h2>
             <select   className={styles.select} id="mes" value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
                <option value="">Todos</option>
                {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={`2024-${index + 1}-01`}>
                        {new Date(2024, index).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            <button onClick={descargarPDF} className={styles.downloadButton}>Descargar en PDF</button>
            <table className={styles.reservasTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Personas</th>
                        <th>Toallas</th>
                        <th>Toallones</th>
                        <th>Chocolates</th>
                        <th>Acciones</th>
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
                                <td>
                                    <button onClick={() => eliminarReserva(reserva.id)} className={styles.deleteButton}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={10}>No hay reservas para mostrar.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
