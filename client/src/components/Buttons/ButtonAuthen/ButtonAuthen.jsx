import React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";

export default function ButtonAuthen({ children }) {
  return (
    <motion.button
      whileTap={{ scale: 1.15 }}
      whileHover={{ scale: 1.05 }}
      className={styles.button}
    >
      {children}
    </motion.button>
  );
}
