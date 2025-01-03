import './popupStyles.css';
import React from 'react';
const PopupDialog = ({ isOpen, onCancel, onProceed, message }) => {
	if (!isOpen) return null;

	return (
		<div className='popup-overlay'>
			<div className='popup-content'>
				<div className='popup-message'>
					{message || 'Are you sure you want to proceed?'}
				</div>
				<div className='popup-buttons'>
					<button onClick={onCancel} className='popup-button cancel'>
						Cancel
					</button>
					<button onClick={onProceed} className='popup-button proceed'>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopupDialog;
