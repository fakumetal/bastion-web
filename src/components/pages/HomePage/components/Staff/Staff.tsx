'use client';

import { Accordion, ImageWithFallback, Typography } from '@/components/common';
import styles from './Staff.module.scss';
import { useCallback, useState } from 'react';
import classNames from 'classnames';

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec maximus nibh. Aliquam ante urna, commodo ac vestibulum ac, aliquet nec purus. Nunc tincidunt massa vel nisl luctus, eu fringilla turpis vehicula. Sed et placerat justo, eget volutpat odio. Cras blandit est id elementum gravida. Aliquam commodo erat non dui lacinia tincidunt. Integer sem nisl, malesuada sit amet egestas in, malesuada ut nunc. Ut at augue ut libero iaculis faucibus a ac velit. Donec tristique ac mauris eget lobortis. Aliquam iaculis orci vel sagittis elementum. Fusce interdum risus ut massa ornare porta. Vivamus gravida commodo orci, eu facilisis lacus viverra eget.

Nunc efficitur, nisl sit amet porta hendrerit, neque lectus dapibus nibh, in pharetra magna nibh in lacus. `

const STAFF_MEMBERS = [
  {
    name: 'Jessica',
    description: LOREM,
    image: '/img/home/staff/jessica.jpg',
  },
  {
    name: 'Laureano',
    description: LOREM,
    image: '/img/home/staff/laureano.jpg',
  },
  {
    name: 'Liliam',
    description: LOREM,
    image: '/img/home/staff/liliam.jpg',
  },
  {
    name: 'Victor',
    description: LOREM,
    image: '/img/home/staff/victor.jpg',
  },
];

export default function Staff() {
  const [selectedStaffs, setSelectedStaffs] = useState<string[]>([]);

  const handleStaffSelection = useCallback((staffName: string) => {
    if (selectedStaffs && selectedStaffs.includes(staffName)) {
      setSelectedStaffs(selectedStaffs.filter(staff => staff !== staffName));
    } else {
      setSelectedStaffs([...selectedStaffs, staffName]);
    }
  }, [selectedStaffs]);

  return (
    <div
      id="staff"
      className={styles.staffContainer}
    >
      <Typography variant="h1">Staff Profesional</Typography>
      <div className={styles.staffContent}>
        <Typography
          className={styles.text}
          variant="normal"
        >
          En Oskar Leon, entendemos que la excelencia en fotografía y videografía no es solo el resultado de un buen
          equipo técnico, sino del talento y la experiencia de las personas detrás de la cámara. Nuestro Staff
          Profesional está compuesto por expertos apasionados que, con años de trayectoria y un ojo agudo para los
          detalles, se dedican a capturar cada momento de manera única y auténtica. Nos enorgullece contar con un equipo
          que no solo domina las técnicas más avanzadas del sector, sino que también entiende la importancia de narrar
          historias visuales que resuenen con cada cliente. En Oskar Leon, cada miembro de nuestro equipo es una pieza
          clave para transformar tus recuerdos en imágenes que perdurarán para siempre.
        </Typography>
        <div className={styles.staffList}>
          {STAFF_MEMBERS.map(staff => {
            const isSelected = selectedStaffs.includes(staff.name);
            return (
            <Accordion
              key={staff.name}
              title={staff.name}
              className={classNames(styles.accordion, {[styles.selected]: isSelected})}
              onClick={() => handleStaffSelection(staff.name)}
            >
              <div className={classNames(styles.staffItem, {[styles.selected]: isSelected})}>
                <ImageWithFallback
                  className={styles.staffImage}
                  src={staff.image}
                  alt={staff.name}
                  width={200}
                  height={200}
                />
                <Typography className={styles.staffText} variant="normal">{staff.description}</Typography>
              </div>
            </Accordion>
          )})}
        </div>
      </div>
    </div>
  );
}
