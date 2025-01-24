import { useTranslation } from 'react-i18next';
import './popupStyles.css';
import React from 'react';
const PopupDialog = ({ isOpen, onCancel, onProceed, message }) => {
	const { i18n } = useTranslation('');
	if (!isOpen) return null;

	return (
		<div className='popup-overlay'>
			<div className='popup-content'>
				<div className='popup-message'>
					{message || i18n.language === 'en'
						? 'Are you sure you want to proceed?'
						: 'Devam etmek istediğinizden emin misiniz?'}
				</div>
				<div className='popup-buttons'>
					<button onClick={onCancel} className='popup-button cancel'>
						{i18n.language === 'en' ? 'Cancel' : 'İptal'}
					</button>
					<button onClick={onProceed} className='popup-button proceed'>
						{i18n.language === 'en' ? 'Proceed' : 'Devam Et'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopupDialog;
