import React from 'react';
import './containerStyle.css';
import './columnStyle.css';
function Container({ children, className, styleProp }) {
	return (
		<div className={`container ${className}`} style={styleProp}>
			{children}
		</div>
	);
}
export default Container;
