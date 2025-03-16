import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import InputAuthen from "../../components/Inputs/InputAuthen/InputAuthen";
import ButtonAuthen from "../../components/Buttons/ButtonAuthen/ButtonAuthen";
import shakeEffect from "../../animations/shakeEffect";
import { Link } from "react-router-dom";
import validator from "validator";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // error is an object: { status: boolean, message: string }
  const [error, setError] = useState({ status: false, message: "" });

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

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
  }, [error]);

  function reset() {
    usernameRef.current.style.borderColor = "rgb(133, 127, 127)";
    emailRef.current.style.borderColor = "rgb(133, 127, 127)";
    passwordRef.current.style.borderColor = "rgb(133, 127, 127)";
    passwordCheckRef.current.style.borderColor = "rgb(133, 127, 127)";
    setError((prev) => ({ ...prev, status: false, message: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    reset();

    ////empty inputs checking
    if (!username || !email || !password || !passwordCheck) {
      setError((prev) => ({
        ...prev,
        status: true,
        message: "Please fill all inputs",
      }));

      if (!username) usernameRef.current.style.borderColor = "red";
      if (!email) emailRef.current.style.borderColor = "red";
      if (!password) passwordRef.current.style.borderColor = "red";
      if (!passwordCheck) passwordCheckRef.current.style.borderColor = "red";
    }

    ///password checking
    if (password !== passwordCheck) {
      setError((prev) => ({
        ...prev,
        status: true,
        message: "Passwords do not match",
      }));
      passwordRef.current.style.borderColor = "red";
      passwordCheckRef.current.style.borderColor = "red";
      setPassword("");
      setPasswordCheck("");
    }
    if (!validator.isEmail(email)) {
      setError((prev) => ({
        ...prev,
        status: true,
        message: "please enter valid email",
      }));
      setEmail("");
      emailRef.current.style.borderColor = "red";
    }
  }

  return (
    <motion.div
      className={styles.container}
      variants={shakeEffect}
      animate={error.status ? "shake" : "still"}
    >
      <img src="./drive.png" width="120px" alt="Drive Logo" />
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
    </motion.div>
  );
}
