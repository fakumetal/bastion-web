import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.scss';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { appFirebase } from '../../../../../firebase';

const db = getFirestore(appFirebase);

export default function CustomCalendar() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [occupiedDates, setOccupiedDates] = useState<Date[]>([]);
  const [cantidadPersonas, setCantidadPersonas] = useState<number>(1);
  const [precioTotal, setPrecioTotal] = useState<number>(0);

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

  const handleDateChange = (value: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(value)) {
      setDateRange(value);
    } else {
      setDateRange([value, null]);
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
      const totalReserva = (precioTotal * 0.8); // 80% del total
      const reservaInfo = {
        total: precioTotal,
        reserva: totalReserva,
      };
      localStorage.setItem('reservaInfo', JSON.stringify(reservaInfo));
    }
  };

  const isDateOccupied = (date: Date) => {
    return occupiedDates.some((occupiedDate) => {
      return date.toDateString() === occupiedDate.toDateString();
    });
  };

  const calculatePrice = () => {
    if (dateRange[0] && dateRange[1]) {
      const start = dateRange[0];
      const end = dateRange[1];
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) - 1;

      let pricePerNight = 0;
      if (cantidadPersonas <= 2) {
        pricePerNight = 80000;
      } else if (cantidadPersonas <= 4) {
        pricePerNight = 170000;
      } else if (cantidadPersonas <= 8) {
        pricePerNight = 200000;
      }

      const totalPrice = totalDays * pricePerNight;
      setPrecioTotal(totalPrice);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [dateRange, cantidadPersonas]);

  return (
    <div className={styles.calendarContainer}>
      <h2>Reserva</h2>
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
        {dateRange[0] && dateRange[1] && (
          <div className={styles.dateInfo}>
            <p className={styles.selectedRange}>
              Check-in: {dateRange[0]?.toLocaleDateString()} 13:00hs <br />
              Check-Out: {dateRange[1]?.toLocaleDateString()} 10:00hs
            </p>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="cantidadPersonas">Cantidad de Personas:</label>
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
          <div className={styles.priceInfo}>
            <p>
              Precio Total: ${precioTotal.toLocaleString()} <br />
              Reserva (80% del total): ${(precioTotal * 0.8).toLocaleString()}
            </p>
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
