'use client';

import Link from 'next/link';
import { Button, Icon, Typography } from '@/components/common';
import styles from './ContactMe.module.scss';

export default function ContactMe() {
  return (
    <div
      className={styles.contactMeContainer}
      id="contact"
    >
      <Typography variant="h1">Contacto</Typography>
      <Typography variant="subtitle">
        ¡Hablemos! Sumate a nuestras redes y contactanos para hacer realidad tus ideas.
      </Typography>
      <div className={styles.contactInfo}>
        <Link
          className={styles.link}
          href="https://www.facebook.com/oskarleondarius"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            iconId="facebook"
            width={70}
            height={70}
          />
        </Link>
        <Link
          className={styles.link}
          href="https://www.instagram.com/leon_oskar_foto_video"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            iconId="instagram"
            width={70}
            height={70}
          />
        </Link>
        <Link
          className={styles.link}
          href="https://wa.me/5492995048219"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            iconId="whatsapp"
            width={70}
            height={70}
          />
        </Link>
        <Link
          className={styles.link}
          href="mailto:oskarleonfotografo@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            iconId="gmail"
            width={70}
            height={70}
          />
        </Link>
      </div>
    </div>
  );
}
