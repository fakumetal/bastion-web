'use client';

import { useState } from 'react';
import styles from './TopNavigation.module.scss';
import { Button, Icon, ImageWithFallback, Typography } from '@/components/common';

const NAV_BUTTONS = [
  {
    label: 'inicio',
    url: '#',
  },
  {
    label: 'alojamiento',
    url: '#accommodation',
  },
  {
    label: 'sobre nosotros',
    url: '#aboutUs',
  },
  {
    label: 'reseñas',
    url: '#reviews',
  },
  {
    label: 'propuesta',
    url: '#proposal',
  },
  {
    label: 'detrás de bastión',
    url: '#behindBastion',
  },
  {
    label: 'contacto',
    url: '#contact',
  },
];

export default function TopNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavButtonClick = (url: string) => {
    window.location.href = url;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <Typography variant="subtitle">{button.label}</Typography>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
