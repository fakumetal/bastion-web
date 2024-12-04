import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.scss';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { appFirebase } from '../../../../../firebase';
import { Typography } from '@/components/common';

const db = getFirestore(appFirebase);

export default function CustomCalendar() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [occupiedDates, setOccupiedDates] = useState<Date[]>([]);
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(1);
  const [precioTotal, setPrecioTotal] = useState<number>(0);
  const [precioEstadia, setPrecioEstadia] = useState<number>(0);
  useEffect(() => {
    const fetchOccupiedDates = async () => {
      const reservasCollection = collection(db, 'reservas');
      const reservasSnapshot = await getDocs(reservasCollection);
      const dates: Date[] = [];

      reservasSnapshot.forEach((doc) => {
        const data = doc.data();
        const startDateParts = data.startDate.split('/');
        const endDateParts = data.endDate.split('/');

        const startDate = new Date(
          parseInt(startDateParts[2], 10),
          parseInt(startDateParts[1], 10) - 1,
          parseInt(startDateParts[0], 10)
        );

        const endDate = new Date(
          parseInt(endDateParts[2], 10),
          parseInt(endDateParts[1], 10) - 1,
          parseInt(endDateParts[0], 10)
        );

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
        }
      });

      setOccupiedDates(dates);
    };

    fetchOccupiedDates();
  }, []);




  const isDateOccupied = (date: Date) => {
    return occupiedDates.some((occupiedDate) => date.toDateString() === occupiedDate.toDateString());
  };

  const isRangeOccupied = (start: Date, end: Date) => {
    const tempDate = new Date(start);
    while (tempDate <= end) {
      if (isDateOccupied(tempDate)) {
        return true;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }
    return false;
  };



  const handleDateChange = (value: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(value) && value[0] && value[1]) {
      if (isRangeOccupied(value[0], value[1])) {
        alert("No se puede seleccionar este rango porque contiene fechas ocupadas.");
      } else {
        setDateRange(value);
      }
    } else if (value instanceof Date) {
      setDateRange([value, null]);
    } else {
      setDateRange([null, null]);
    }
  };
  

  const handleNextClick = () => {
    if (dateRange[0] && dateRange[1]) {
      const reservaDate = {
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1].toISOString(),
        cantidadPersonas,  
      };
      localStorage.setItem('reservaDate', JSON.stringify(reservaDate));

      // Guardar el precio total y reserva en el localStorage
      const totalReserva = (precioEstadia * 0.8); // 80% del total
      const reservaInfo = {
        total: precioTotal,
        reserva: totalReserva,
      };
      localStorage.setItem('reservaInfo', JSON.stringify(reservaInfo));
    }
  };

 
  const calculatePrice = () => {
    if (dateRange[0] && dateRange[1]) {
      const start = dateRange[0];
      const end = dateRange[1];
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) - 1;
  
      let pricePerNight = 0;
      if (cantidadPersonas <= 2) {
        pricePerNight = 120000;
      } else if (cantidadPersonas <= 4) {
        pricePerNight = 200000;
      } else if (cantidadPersonas <= 8) {
        pricePerNight = 320000;
      }
  
      const cleaningFee = 40000;   
      const depositFee = 40000;   
  
  
      const totalPrice = (totalDays * pricePerNight) + cleaningFee + depositFee;
      const estadiaPrice = (totalDays * pricePerNight)
      setPrecioEstadia(estadiaPrice);
      setPrecioTotal(totalPrice);
    }
  };
  
  useEffect(() => {
    calculatePrice();
  }, [dateRange, cantidadPersonas]);

  return (
    <div className={styles.calendarContainer}>
      <Typography variant={'subtitle'}  >Reservas</Typography>
      <Calendar
        selectRange
        onChange={handleDateChange}
        value={dateRange}
        className={styles.customCalendar}
        minDate={new Date()}
        locale="es"
        tileDisabled={({ date }) => isDateOccupied(date)}
        tileContent={({ date }) => {
          if (isDateOccupied(date)) {
            return <div className={styles.occupiedDate} />;
          }
          return null;
        }}
      />
      <div className={styles.infoContainer}>
      <div className={styles.formGroup}>
        <Typography variant={'normal'}> <label htmlFor="cantidadPersonas">Cantidad de Personas:</label></Typography>
       
          <select
            id="cantidadPersonas"
            name="cantidadPersonas"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(parseInt(e.target.value))}
          >
            {Array.from({ length: 8 }, (_, num) => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        {dateRange[0] && dateRange[1] && (
          <div className={styles.dateInfo}>
            <p className={styles.selectedRange}>
              Check-in:  <strong>{dateRange[0]?.toLocaleDateString()} 13:00hs</strong>  <br />
              Check-Out: <strong> {dateRange[1]?.toLocaleDateString()} 10:00hs</strong> 
            </p>
          </div>
        )}
   

        {dateRange[0] && dateRange[1] && (
          <div className={styles.priceInfo}>
<Typography variant="normal" className={styles.typographyContainer}>
  <p className={styles.cleaningFee}>
    Tarifa de Limpieza: <strong>$40,000  (por única vez)</strong>
  </p>
  <p className={styles.depositFee}>
    Depósito en garantía: <strong>$40,000  (se devuelve al finalizar la estadía)</strong>
  </p>
  <p className={styles.stayPrice}>
    Precio estadía: <strong>${precioEstadia.toLocaleString()}</strong>
  </p>
  <p className={styles.reservePrice}>
    Reserva (80% de estadía): <strong>${(precioEstadia * 0.8).toLocaleString()}</strong>
  </p>
  <p className={styles.totalPrice}>
    Precio Total: <strong>${precioTotal.toLocaleString()}</strong>
  </p>
</Typography>



         
          </div>
        )}

        {dateRange[0] && dateRange[1] && (
          <Link href="/completeReserva">
            <button className={styles.nextButton} onClick={handleNextClick}>
              Siguiente
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
