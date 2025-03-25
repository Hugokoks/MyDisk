import styles from './index.module.css'

function ButtonMain({ children }) {
    return (

        <button className={styles.button}>{children}</button>
    )
}

export default ButtonMain
