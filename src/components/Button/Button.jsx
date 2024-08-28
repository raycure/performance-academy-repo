import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

function Button({ children, redirect, type, disabled }) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (redirect) {
			navigate(redirect);
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			type={type}
			className='btn'
		>
			{children}
		</button>
	);
}

export default Button;
