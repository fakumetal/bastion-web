'use client';

import styles from './ContactMe.module.scss';
import { SocialNetworks } from '@/components/layout';

export default function ContactMe() {
  return (
    <div
      className={styles.contactMeContainer}
      id="contact"
    >
      <SocialNetworks title="Contactanos" />
    </div>
  );
}
