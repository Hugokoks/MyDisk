import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import InputAuthen from "../../components/Inputs/InputAuthen/InputAuthen";
import ButtonAuthen from "../../components/Buttons/ButtonAuthen/ButtonAuthen";
import shakeEffect from "../../animations/shakeEffect";
import { Link, useNavigate } from "react-router-dom";
import { postFetch } from "../../functions/postFetch";
import { apis } from "./../../config";
import { useRegister } from "../../contexts/RegisterContext";
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
    inputStyle
  } = useRegister();

  // Reset error after 500ms if error is active
  useEffect(() => {
    let timer;
    if (error.status) {
      timer = setTimeout(() => {
        setError((prev) => ({
          ...prev,
          status: false,
        }));
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [error, setError]);


  /////set error already used email and username after fetch 
  useEffect(() => {

    if (error.message === "email already exists") emailRef.current.style.borderColor = inputStyle.error;
    if (error.message === "username already exists") usernameRef.current.style.borderColor = inputStyle.error;

  }, [setError, error, emailRef, usernameRef, inputStyle])


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

      const res = await postFetch({ data: { username, email, password, passwordCheck }, url: apis.create_register, setError, setIsLoading });

      if (res.status === "ok") {

        navigate("/email_redirect");
      }
    }
  }

  return (
    <motion.div
      className={styles.containerReg}
      variants={shakeEffect}
      animate={error.status ? "shake" : "still"}
    >
      <img src="./drive.png" width="100px" alt="DriveLogo" />
      <p className={styles.title}>Register</p>
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
        <ButtonAuthen>Register</ButtonAuthen>
      </form>
      <p className={styles.link}>
        already have account? <Link to="/login">login</Link>
      </p>
      {error.message !== "" && <p className={styles.error}>{error.message}</p>}
      {isLoading && <LoadingSpinner />}
    </motion.div>
  );
}
