import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
function Button({ children }) {
	return <button className='btn'>{children}</button>;
}
export default Button;
