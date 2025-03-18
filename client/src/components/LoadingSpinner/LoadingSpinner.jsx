import { OrbitProgress } from "react-loading-indicators";
import styles from './index.module.css'


function LoadingSpinner() {
    return (
        <div className={styles.container}>
            <OrbitProgress color="yellow" size="medium" text="" textColor="#ffffff" />
        </div>
    )
}

export default LoadingSpinner
