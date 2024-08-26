import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

function Button({ children, redirect }) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (redirect) {
			navigate(redirect);
		}
	};

	return (
		<button onClick={handleClick} className='btn'>
			{children}
		</button>
	);
}

export default Button;
