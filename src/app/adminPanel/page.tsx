'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Footer, TopNavigation } from '@/components/layout';
import { AdminPanelPage } from '@/components/pages';
import { useAuth } from '@/context/AuthContext';

const Reservas: React.FC = () => {
    //@ts-ignore
  const { user, loading } = useAuth();  
  const router = useRouter();  

  useEffect(() => {
    
    if (!loading && !user) {
      router.push('/'); 
    }
  }, [user, loading, router]);  

  if (loading) {
    return <p>Cargando...</p>;  
  }

 
  if (!user) {
    return null;  
  }

  return (
    <div>
      <TopNavigation />
      <AdminPanelPage />
 
    </div>
  );
};

export default Reservas;
