// pages/reservas.tsx

import { Footer, TopNavigation } from '@/components/layout';
import { PaymenSuccessPage } from '@/components/pages';
import React, { Suspense } from 'react';

// Componente de retroceso
const Loading = () => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <h2>Cargando...</h2>
  </div>
);

const Reservas: React.FC = () => {
  return (
    <div>
        <TopNavigation />
      <Suspense fallback={<Loading />}>
        <PaymenSuccessPage />
      </Suspense>
      <Footer /> 
    </div>
  );
};

export default Reservas;
