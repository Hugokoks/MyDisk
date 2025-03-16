import React from "react";
import styles from "./index.module.css";
import { motion } from "framer-motion";

export default function InputAuthen({
  placeholder,
  inputType,
  value,
  handleChange,
  ref,
}) {
  return (
    <motion.input
      type={inputType}
      className={styles.input}
      placeholder={placeholder}
      whileFocus={{ scale: 1.05 }}
      value={value}
      onChange={handleChange}
      ref={ref}
    />
  );
}
