import React, { useState, useEffect } from 'react';
import './notificationStyle.css';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleExclamation } from 'react-icons/fa6';
import { HiMiniXCircle } from 'react-icons/hi2';
const CustomNotification = () => {
	const [notification, setNotification] = useState(null);
	const { t, i18n } = useTranslation('translation');
	useEffect(() => {
		window.addEventListener('notificationEvent', handleStorageChange);
		const savedNotification = JSON.parse(localStorage.getItem('Notifexp'));
		if (savedNotification) {
			setNotification(savedNotification);
		}

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const handleStorageChange = () => {
		const savedNotification = JSON.parse(localStorage.getItem('Notifexp'));
		if (savedNotification) {
			setNotification(savedNotification);
		}
	};

	useEffect(() => {
		if (notification?.duration) {
			const timer = setTimeout(() => {
				closeNotification();
			}, notification.duration);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	if (!notification) return null;

	const closeNotification = () => {
		setNotification(null);
		localStorage.removeItem('Notifexp');
	};

	const renderIcon = () => {
		switch (notification.type) {
			case 'info':
				return <FaInfoCircle style={{ width: '80%', height: '80%' }} />;
			case 'success':
				return <FaCheckCircle style={{ width: '80%', height: '80%' }} />;
			case 'error':
				return <HiMiniXCircle style={{ width: '95%', height: '95%' }} />;
			case 'warning':
				return <FaCircleExclamation style={{ width: '75%', height: '75%' }} />;
			default:
				return null;
		}
	};
	return (
		<div className={`notification ${notification.type}`}>
			<div className='notification-content'>
				<div className='notification-icon'>{renderIcon()}</div>
				<div>
					<h1 style={{ fontWeight: 'bolder' }} className='text-primary-500'>
						{notification.type === 'info'
							? i18n.language === 'en'
								? 'Info'
								: 'Bilgi'
							: notification.type === 'success'
							? i18n.language === 'en'
								? 'Success'
								: 'Başarılı'
							: notification.type === 'error'
							? i18n.language === 'en'
								? 'Error'
								: 'Sorun'
							: i18n.language === 'en'
							? 'Warning'
							: 'Uyarı'}
					</h1>
					<p className='text-accent-100'>
						{notification.message}{' '}
						{notification.link && (
							<a href={notification.link} className='link'>
								{i18n.language === 'en' ? 'here' : 'buradan'}
							</a>
						)}
					</p>
				</div>
				<button className='close-btn' onClick={closeNotification}>
					<MdClose
						style={{
							flexShrink: '0',
							width: '100%',
							height: '100%',
						}}
					/>
				</button>
			</div>
		</div>
	);
};
export default CustomNotification;
