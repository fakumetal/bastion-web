'use client';

import styles from './HomePage.module.scss';
import { AboutMe, Accomodation, ContactMe, CoursesResume, IntroBanner, PortfolioResume, Staff } from './components';

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <IntroBanner />
      <Accomodation />
      <AboutMe />
      <Staff />
      <PortfolioResume />
      <CoursesResume />
      <ContactMe />
    </div>
  );
}
