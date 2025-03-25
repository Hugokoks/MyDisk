import styles from './index.module.css'
import InputAuthen from '../../components/Inputs/InputAuthen/InputAuthen'
import ButtonMain from '../../components/Buttons/ButtonMain/ButtonMain';
import { useLogin } from '../../contexts/LoginContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import autoResetError from '../../functions/autoResetError';
import LogRegBox from '../../components/LogRegBox/LogRegBox';
import { inputStyle } from '../../components/Inputs/InputAuthen/inputStyles';
import { postFetch } from '../../functions/postFetch';
import { apis } from '../../config';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Login() {

    const {
        username,
        setUsername,
        password,
        setPassword,
        usernameRef,
        passwordRef,
        error,
        setError,
        isLoading,
        setIsLoading,
        handleClientErrors } = useLogin();


    useEffect(() => {
        autoResetError(error, setError);
    }, [error, setError]);

    function reset() {
        usernameRef.current.style.borderColor = inputStyle.default;
        passwordRef.current.style.borderColor = inputStyle.default;
        setError((prev) => ({ ...prev, status: false, message: "" }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        reset();
        const hasError = handleClientErrors();

        if (!hasError) {
            const response = await postFetch({ data: { username, password }, setError, setIsLoading, url: apis.user_login });

            if (response.status === 'ok') {
                localStorage.setItem("token", response.token);

            }

        }


    }
    return (
        <LogRegBox error={error} title="Log In" >
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputAuthen
                    inputType="text"
                    placeholder="username or email..."
                    value={username}
                    handleChange={(e) => { setUsername(e.target.value) }}
                    ref={usernameRef}

                />
                <InputAuthen
                    inputType="password"
                    placeholder="password..."
                    value={password}
                    handleChange={(e) => { setPassword(e.target.value) }}
                    ref={passwordRef}

                />
                <ButtonMain>Log In</ButtonMain >
            </form>
            <p className={styles.link}>
                Don't have account? <Link to="/register">register</Link>
            </p>
            {error.message !== "" && <p className={styles.error}>{error.message}</p>}
            {isLoading && <LoadingSpinner />}
        </LogRegBox>
    )
}

export default Login
