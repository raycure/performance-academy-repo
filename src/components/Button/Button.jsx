import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
function Button({ children, page }) {
	return (
		<Link to={page} className='btn-link'>
			<button className='btn'>{children}</button>
		</Link>
	);
}
export default Button;
