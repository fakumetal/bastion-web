import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { appFirebase } from '@/firebase';

interface Precio {
    tarifaLimpieza: string;
    depositoGarantia: string;
    hasta2Personas: string;
    hasta4Personas: string;
    hasta8Personas: string;
}

interface ModalPreciosProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPrecios: React.FC<ModalPreciosProps> = ({ isOpen, onClose }) => {
    const [precios, setPrecios] = useState<Precio>({
        tarifaLimpieza: '',
        depositoGarantia: '',
        hasta2Personas: '',
        hasta4Personas: '',
        hasta8Personas: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const fetchPrecios = async () => {
                setLoading(true);
                const db = getFirestore(appFirebase);
                const preciosDoc = await getDoc(doc(db, 'precios', 'tarifas'));
                
                if (preciosDoc.exists()) {
                    setPrecios(preciosDoc.data() as Precio);
                } else {
                    console.log('No se encontraron los precios en la base de datos');
                }
                setLoading(false);
            };

            fetchPrecios();
        }
    }, [isOpen]);

    const handleChange = (field: keyof Precio, value: string) => {
        setPrecios({ ...precios, [field]: value });
    };

    const handleSave = async () => {
        const db = getFirestore(appFirebase);
        try {
            await setDoc(doc(db, 'precios', 'tarifas'), precios);
            alert('Precios guardados exitosamente');
            onClose();
        } catch (error) {
            console.error('Error al guardar los precios: ', error);
        }
    };

    return (
        <Modal
            title="Modificar Precios"
            visible={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave} loading={loading}>
                    Guardar
                </Button>,
            ]}
        >
            <div>
                <div>
                    <label>Tarifa Limpieza</label>
                    <Input
                        value={precios.tarifaLimpieza}
                        onChange={(e) => handleChange('tarifaLimpieza', e.target.value)}
                    />
                </div>
                <div>
                    <label>Depósito Garantía</label>
                    <Input
                        value={precios.depositoGarantia}
                        onChange={(e) => handleChange('depositoGarantia', e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasta 2 Personas</label>
                    <Input
                        value={precios.hasta2Personas}
                        onChange={(e) => handleChange('hasta2Personas', e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasta 4 Personas</label>
                    <Input
                        value={precios.hasta4Personas}
                        onChange={(e) => handleChange('hasta4Personas', e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasta 8 Personas</label>
                    <Input
                        value={precios.hasta8Personas}
                        onChange={(e) => handleChange('hasta8Personas', e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ModalPrecios;
