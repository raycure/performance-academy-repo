import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';
import { motion } from 'framer-motion';

function Button({
	children,
	redirect,
	navProp,
	styleProp,
	disabled,
	onClick,
	classProp,
	isLoading,
}) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (redirect) {
			navigate(redirect, { state: navProp });
		}
	};

	return (
		<motion.button
			className={`btn ${classProp}`}
			style={{ ...styleProp }}
			whileHover={!disabled ? { scale: 1.08 } : {}}
			whileTap={!disabled ? { scale: 0.8 } : {}}
			transition={{ type: 'spring', stiffness: 200, damping: 30 }}
			onClick={onClick ? onClick : handleClick}
			disabled={disabled}
		>
			{isLoading ? 'Loading...' : children}
		</motion.button>
	);
}

export default Button;
