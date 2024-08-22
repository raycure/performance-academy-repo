import React from 'react';
import './containerStyle.css';
import './columnStyle.css';
function Container({ children, className }) {
	return <div className={`${className} container `}>{children}</div>;
}
export default Container;
