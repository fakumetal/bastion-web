// pages/reservas.tsx

import { Footer, TopNavigation } from '@/components/layout';
 import { MiReservaPage } from '@/components/pages';

const MiReservas: React.FC = () => {
  return (
    <div  >
      <TopNavigation />
      <MiReservaPage />
      <Footer />
    </div>
  );
};

export default MiReservas;
