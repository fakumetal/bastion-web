// pages/reservas.tsx

import { Footer, TopNavigation } from '@/components/layout';
import { CalendarPage } from '@/components/pages';
import styles from './reservas.module.scss'; 

const Reservas: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
       <TopNavigation />
      <div className={styles.content}>
        <CalendarPage />
      </div>
      <Footer />  
    </div>
  );
};

export default Reservas;
