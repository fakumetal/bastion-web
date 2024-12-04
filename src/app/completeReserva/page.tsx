// pages/reservas.tsx

import { Footer, TopNavigation } from '@/components/layout';
import { CompleteReservaPage } from '@/components/pages';

const Reservas: React.FC = () => {
  return (
    <div  >
       <TopNavigation />
      <CompleteReservaPage />
      <Footer />  
    </div>
  );
};

export default Reservas;
