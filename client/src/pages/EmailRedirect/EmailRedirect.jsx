import styles from './index.module.css'
import ButtonMain from '../../components/Buttons/ButtonMain/ButtonMain'

function EmailRedirect() {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Validate your Account</p>
            <p className={styles.text}>A verification link has been sent to your email.</p>
            <p className={styles.text2}>did you now recieve email? click below</p>
            <ButtonMain>resend email</ButtonMain>
        </div>

    )
}

export default EmailRedirect
