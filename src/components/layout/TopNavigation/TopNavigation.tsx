'use client';

import { useState } from 'react';
import styles from './TopNavigation.module.scss';
import { Button, Icon, ImageWithFallback, Typography } from '@/components/common';
import { useAuth } from '@/context/AuthContext';  
import { getAuth, signOut } from 'firebase/auth'; // Importar la función signOut
import router from 'next/router';

const NAV_BUTTONS = [
  {
    label: 'inicio',
    url: '/#',
  },
  {
    label: 'alojamiento',
    url: '/#accommodation',
  },
  {
    label: 'sobre nosotros',
    url: '/#aboutUs',
  },
  {
    label: 'reseñas',
    url: '/#reviews',
  },
  {
    label: 'propuesta',
    url: '/#proposal',
  },
  {
    label: 'detrás de bastión',
    url: '/#aboutMe',
  },
  {
    label: 'contacto',
    url: '/#contact',
  },
  {
    label: 'Mi reserva',
    url: '/mi-reserva',
  },
];

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    //@ts-ignore
  const { user } = useAuth();   
  
  const handleNavButtonClick = (url: string) => {
    window.location.href = url;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    const auth = getAuth(); // Obtener la instancia de autenticación
    try {
      await signOut(auth); // Cerrar sesión
      console.log('Sesión cerrada con éxito');
      router.replace('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className={styles.topNavigation}>
      <div className={styles.leftSection}>
        <Button
          variant="transparent"
          className={styles.logoButton}
        >
          <ImageWithFallback
            src="/img/logo.png"
            alt="Bastion Logo"
            width={55}
            height={60}
          />
        </Button>
        <Typography
          variant="title"
          className={styles.siteTitle}
        >
          Bastion
        </Typography>
      </div>
      <div className={styles.navButtons}>
        {NAV_BUTTONS.map(button => (
          <Button
            className={styles.navButton}
            key={button.label}
            variant="transparent"
            onClick={() => handleNavButtonClick(button.url)}
          >
            <Typography
              className={styles.navButtonText}
              variant="normal"
            >
              {button.label}
            </Typography>
          </Button>
        ))}
        {user && (  // Mostrar el botón solo si el admin está autenticado
          <>
            <Button
              className={styles.navButton}
              variant="transparent"
              onClick={() => handleNavButtonClick('/adminPanel')}
            >
              <Typography variant="normal"> <p style={{fontSize:'16px'}} >Admin Panel</p> </Typography>
            </Button>
            <Button
              className={styles.navButton} // Estilo para el botón de cerrar sesión
              variant="transparent"
              onClick={handleLogout} // Llamar a la función de cerrar sesión
            >
              <Typography variant="normal"><p style={{fontSize:'16px'}}>Cerrar Sesión</p></Typography>
            </Button>
          </>
        )}
      </div>
      <div className={styles.hamburgerMenu}>
        <Button
          variant="transparent"
          onClick={handleMenuToggle}
        >
          <Icon
            iconId="hamburger-menu"
            width={20}
            height={20}
          />
        </Button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            {NAV_BUTTONS.map(button => (
              <Button
                className={styles.navButton}
                key={button.label}
                variant="transparent"
                onClick={() => handleNavButtonClick(button.url)}
                type="button"
              >
                <Typography variant="normal">{button.label}</Typography>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
