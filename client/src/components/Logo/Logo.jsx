import styles from './index.module.css'

function Logo() {
    return (
        <div className={styles.container} >
            <img src="./drive.png" width="60px" alt="DriveLogo" />
            <p>MyDisk</p>


        </div>
    )
}

export default Logo
