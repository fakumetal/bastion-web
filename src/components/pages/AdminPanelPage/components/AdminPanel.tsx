import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc } from 'firebase/firestore';
import { appFirebase } from '@/firebase';
import { Button, Modal, Input, DatePicker, message, InputNumber, Form } from 'antd';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './adminPanel.module.scss';
import ModalPrecios from './ModalPrecios';

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
    const [isCrearReservaModalOpen, setIsCrearReservaModalOpen] = useState(false); // Modal de crear reserva
    const [isPreciosModalOpen, setIsPreciosModalOpen] = useState(false); // Modal de precios
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaInicio, setFechaInicio] = useState<any>(null);
    const [fechaFin, setFechaFin] = useState<any>(null);
    const [cantidadPersonas, setCantidadPersonas] = useState<number | undefined>(); 

    const [toallas, setToallas] = useState<number | undefined>(); 
    const [toallones, setToallones] =  useState<number | undefined>(); 
    const [chocolates, setChocolates] =  useState<number | undefined>(); 

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

     // Funciones para manejar el modal de crear reserva
     const handleOpenCrearReservaModal = () => setIsCrearReservaModalOpen(true);
     const handleCloseCrearReservaModal = () => {
        setIsCrearReservaModalOpen(false);
  
        setNombre('');
        setEmail('');
        setTelefono('');
        setFechaInicio(null);
        setFechaFin(null);
        setCantidadPersonas(undefined);
        setToallas(undefined);
        setToallones(undefined);
        setChocolates(undefined);
    };
 
     const handleSubmit = async () => {
        if (!nombre || !email || !telefono || !fechaInicio || !fechaFin || cantidadPersonas === undefined || cantidadPersonas <= 0) {
            message.error('Por favor complete todos los campos correctamente.');
            return;
        }
 
         const db = getFirestore(appFirebase);
         try {
             await addDoc(collection(db, 'reservas'), {
                 nombre,
                 email,
                 telefono,
                 startDate: format(fechaInicio, 'dd/MM/yyyy'),
                 endDate: format(fechaFin, 'dd/MM/yyyy'),
                 cantidadPersonas,
                 toallas,
                 toallones,
                 chocolates,
             });
             message.success('Reserva creada exitosamente');
             handleCloseCrearReservaModal();
          
             const reservasCollection = collection(db, 'reservas');
             const reservasSnapshot = await getDocs(reservasCollection);
             const reservasList = reservasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Reserva[];
             setReservas(reservasList);
         } catch (error) {
             message.error('Hubo un error al crear la reserva');
             console.error('Error al agregar reserva:', error);
         }
     };
 

    return (
        <div className={styles.adminPanel}>
            <h2>Panel de Administración - Reservas</h2>
            <select className={styles.select} id="mes" value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
                <option value="">Todos</option>
                {Array.from({ length: 12 }, (_, index) => (
                    <option key={index} value={`2024-${index + 1}-01`}>
                        {new Date(2024, index).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            <div className={styles.buttonsAdminPanel}>
                <Button onClick={descargarPDF} className={styles.downloadButton}>
                    Descargar en PDF
                </Button>
                <Button onClick={() => setIsPreciosModalOpen(true)} className={styles.modifyPricesButton}>
                    Modificar Precios
                </Button>
                <Button onClick={handleOpenCrearReservaModal} className={styles.addButton}>
                    Crear Reserva
                </Button>
            </div>

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

           {/* Modal para crear una nueva reserva */}
           <Modal
            title="Crear Reserva"
            open={isCrearReservaModalOpen}
            onCancel={handleCloseCrearReservaModal}
            footer={[
                <Button key="cancel" onClick={handleCloseCrearReservaModal}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Crear Reserva
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item
                    label="Nombre"
                    validateStatus={nombre ? 'success' : 'error'}
                    help={!nombre && "Por favor ingresa el nombre."}
                >
                    <Input
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    validateStatus={email ? 'success' : 'error'}
                    help={!email && "Por favor ingresa el email."}
                >
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Teléfono"
                    validateStatus={telefono ? 'success' : 'error'}
                    help={!telefono && "Por favor ingresa el teléfono."}
                >
                    <Input
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Fecha de inicio"
                    validateStatus={fechaInicio ? 'success' : 'error'}
                    help={!fechaInicio && "Por favor selecciona la fecha de inicio."}
                >
                    <DatePicker
                        placeholder="Fecha de inicio"
                        style={{ width: '100%' }}
                        value={fechaInicio}
                        onChange={setFechaInicio}
                    />
                </Form.Item>

                <Form.Item
                    label="Fecha de fin"
                    validateStatus={fechaFin ? 'success' : 'error'}
                    help={!fechaFin && "Por favor selecciona la fecha de fin."}
                >
                    <DatePicker
                        placeholder="Fecha de fin"
                        style={{ width: '100%' }}
                        value={fechaFin}
                        onChange={setFechaFin}
                    />
                </Form.Item>

                <Form.Item
                    label="Cantidad de personas"
                    validateStatus={cantidadPersonas && cantidadPersonas > 0 ? 'success' : 'error'}
                    help={!(cantidadPersonas && cantidadPersonas > 0) && "Por favor ingresa una cantidad válida de personas."}
                >
                    <InputNumber
                        placeholder="Cantidad de personas"
                        min={1}
                        value={cantidadPersonas}
                        onChange={(value) => setCantidadPersonas(value ?? undefined)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Toallas"
                    //@ts-ignore
                    validateStatus={toallas >= 0 ? 'success' : 'error'}
                          //@ts-ignore
                    help={toallas < 0 && "Por favor ingresa un número válido de toallas."}
                >
                    <InputNumber
                        placeholder="Toallas"
                        min={0}
                        value={toallas}
                        onChange={(value) => setToallas(value ?? undefined)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Toallones"
                          //@ts-ignore
                    validateStatus={toallones >= 0 ? 'success' : 'error'}
                          //@ts-ignore
                    help={toallones < 0 && "Por favor ingresa un número válido de toallones."}
                >
                    <InputNumber
                        placeholder="Toallones"
                        min={0}
                        value={toallones}
                        onChange={(value) => setToallones(value ?? undefined)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Chocolates"
                          //@ts-ignore
                    validateStatus={chocolates >= 0 ? 'success' : 'error'}
                          //@ts-ignore
                    help={chocolates < 0 && "Por favor ingresa un número válido de chocolates."}
                >
                    <InputNumber
                        placeholder="Chocolates"
                        min={0}
                        value={chocolates}
                        onChange={(value) => setChocolates(value ?? undefined)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Form>
        </Modal>


            {/* Modal de modificar precios */}
            <ModalPrecios isOpen={isPreciosModalOpen} onClose={() => setIsPreciosModalOpen(false)} />
        </div>
    );
};

export default AdminPanel;
