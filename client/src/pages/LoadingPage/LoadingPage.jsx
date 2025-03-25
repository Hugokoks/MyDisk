import styles from './index.module.css'
import { OrbitProgress } from "react-loading-indicators";

function LoadingPage() {
    return (
        <div className={styles.container}>
            <OrbitProgress color="yellow" size="large" text="" textColor="#ffffff" />

        </div>
    )
}

export default LoadingPage
