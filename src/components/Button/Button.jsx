import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";
import { motion } from "framer-motion";

function Button({ children, redirect, style, disabled, onClick, classProp }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirect) {
      navigate(redirect);
    }
  };

  return (
    <div>
      <motion.button
        className={`btn ${classProp}`}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.8 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        onClick={onClick ? onClick : handleClick}
        disabled={disabled}
        style={style}
      >
        {children}
      </motion.button>
    </div>
  );
}

export default Button;
