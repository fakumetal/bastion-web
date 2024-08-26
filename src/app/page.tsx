import { Footer, TopNavigation } from '@/components/layout';
import styles from './page.module.scss';
import { HomePage } from '@/components/pages';

const Home: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <TopNavigation />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
