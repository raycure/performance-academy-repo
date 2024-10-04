import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';
import { motion } from 'framer-motion';

function Button({
	children,
	redirect,
	navProp,
	style,
	disabled,
	onClick,
	classProp,
	className,
	isLoading,
}) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (redirect) {
			navigate(redirect, { state: navProp });
		}
	};

	return (
		<div className={className}>
			<motion.button
				className={`btn ${classProp}`}
				whileHover={!disabled ? { scale: 1.08 } : {}}
				whileTap={!disabled ? { scale: 0.8 } : {}}
				transition={{ type: 'spring', stiffness: 200, damping: 30 }}
				onClick={onClick ? onClick : handleClick}
				disabled={disabled}
				style={style}
			>
				{isLoading ? 'Loading...' : children}
			</motion.button>
		</div>
	);
}

export default Button;
