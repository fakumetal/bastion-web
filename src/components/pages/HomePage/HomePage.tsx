'use client';

import styles from './HomePage.module.scss';
import { AboutUs, Accomodation, ServiceProposal, AboutMe, ContactMe, IntroBanner, Reviews } from './components';

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <IntroBanner />
      <Accomodation />
      <AboutUs />
      <Reviews />
      <ServiceProposal />
      <AboutMe />
      <ContactMe />
    </div>
  );
}
