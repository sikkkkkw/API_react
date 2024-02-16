import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
  animate={{ x: [0, 100, 0] }}
/>
  );
};

export default LoadingSpinner;
