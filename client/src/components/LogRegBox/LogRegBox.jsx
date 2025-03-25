import styles from './index.module.css'
import shakeEffect from "../../animations/shakeEffect";
import { motion } from "framer-motion";

function LogRegBox({ error, title, children }) {
    return (

        <motion.div
            className={styles.container}
            variants={shakeEffect}
            animate={error.status ? "shake" : "still"}>
            <img src="./drive.png" width="100px" alt="DriveLogo" />
            <p className={styles.title}>{title}</p>
            {children}

        </motion.div>
    )
}

export default LogRegBox

