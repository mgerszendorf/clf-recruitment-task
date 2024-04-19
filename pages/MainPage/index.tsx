import { NavBar } from '@/components/NavBar';
import styles from './style.module.scss';
import { AllProducts } from '@/components/AllProducts';

const MainPage = () => {
    return (
        <div className={styles.mainPage}>
            <NavBar />
            <AllProducts />
        </div>
    );
}

export default MainPage