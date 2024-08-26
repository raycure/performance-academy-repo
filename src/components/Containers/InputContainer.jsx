import React from 'react';
import './containerStyle.css';
function InputContainer({ type, placeholder, id, size }) {
	return (
		<>
			<div
				className={`input-outer-container ${
					size === 'large' && 'input-outer-container-large'
				}`}
			>
				{type === 'textarea' ? (
					<textarea id={id} placeholder={placeholder} />
				) : (
					<input type={type} id={id} placeholder={placeholder} />
				)}
			</div>
		</>
	);
}
export default InputContainer;
