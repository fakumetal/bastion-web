// pages/reservas.tsx

import { Footer, TopNavigation } from '@/components/layout';
import { PaymenSuccessPage } from '@/components/pages';

const Reservas: React.FC = () => {
  return (
    <div  >
      <TopNavigation />
      <PaymenSuccessPage />
      <Footer />
    </div>
  );
};

export default Reservas;
