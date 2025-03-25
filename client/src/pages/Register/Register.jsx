import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import InputAuthen from "../../components/Inputs/InputAuthen/InputAuthen";
import ButtonMain from "../../components/Buttons/ButtonMain/ButtonMain";
import { Link, useNavigate } from "react-router-dom";
import { postFetch } from "../../functions/postFetch";
import { apis } from "./../../config";
import { useRegister } from "../../contexts/RegisterContext";
import autoResetError from "../../functions/autoResetError";
import Cookies from "js-cookie";
import LogRegBox from "../../components/LogRegBox/LogRegBox";
import { inputStyle } from "../../components/Inputs/InputAuthen/inputStyles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function Register() {
  const navigate = useNavigate();

  const {
    username,
    email,
    password,
    passwordCheck,
    setUsername,
    setEmail,
    setPassword,
    setPasswordCheck,
    error,
    isLoading,
    setError,
    setIsLoading,
    usernameRef,
    emailRef,
    passwordRef,
    passwordCheckRef,
    handleClientErrors,
  } = useRegister();

  // Reset error after 500ms if error is active
  useEffect(() => {
    autoResetError(error, setError);
  }, [error, setError]);


  /////set error already used email and username after fetch 
  useEffect(() => {

    if (error.message === "email already exists") emailRef.current.style.borderColor = inputStyle.error;
    if (error.message === "username already exists") usernameRef.current.style.borderColor = inputStyle.error;

  }, [setError, error, emailRef, usernameRef])


  function reset() {
    usernameRef.current.style.borderColor = inputStyle.default;
    emailRef.current.style.borderColor = inputStyle.default;
    passwordRef.current.style.borderColor = inputStyle.default;
    passwordCheckRef.current.style.borderColor = inputStyle.default;
    setError((prev) => ({ ...prev, status: false, message: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    reset();

    const hasError = handleClientErrors();
    if (!hasError) {

      const res = await postFetch({ data: { username, email, password, passwordCheck }, url: apis.user_create, setError, setIsLoading });

      if (res.status === "ok") {
        Cookies.set("app-email", email, { expires: 1 });
        navigate("/email_redirect");
      }
    }
  }

  return (
    <LogRegBox error={error} title="Register">

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAuthen
          placeholder="username..."
          inputType="text"
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
        />
        <InputAuthen
          placeholder="email..."
          inputType="text"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
        <InputAuthen
          placeholder="password..."
          inputType="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
        />
        <InputAuthen
          placeholder="password again..."
          inputType="password"
          value={passwordCheck}
          handleChange={(e) => setPasswordCheck(e.target.value)}
          ref={passwordCheckRef}
        />
        <ButtonMain>Register</ButtonMain>
      </form>
      <p className={styles.link}>
        already have account? <Link to="/login">login</Link>
      </p>
      {error.message !== "" && <p className={styles.error}>{error.message}</p>}
      {isLoading && <LoadingSpinner />}


    </LogRegBox>
  );
}
