import styles from './index.module.css'

function EmailRedirect() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Validate your Account</p>
            <p className={styles.text}>A verification link has been sent to your email.</p>

        </div>

    )
}

export default EmailRedirect
