import React, { useState, useEffect } from 'react';
import './notificationStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoInfo } from 'react-icons/go';
import { FiCheckCircle } from 'react-icons/fi';

import { FiXCircle } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const CustomNotification = () => {
	//todo color and style properly
	const [notification, setNotification] = useState(null);

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
			console.log('notiffff', savedNotification);
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
				return <GoInfo style={{ width: 20, height: 20 }} />;
			case 'success':
				return <FiCheckCircle style={{ width: 20, height: 20 }} />;
			case 'error':
				return <FiXCircle style={{ width: 20, height: 20 }} />;
			default:
				return null;
		}
	};

	return (
		<div className={`notification ${notification.type}`}>
			<div className='notification-content'>
				{renderIcon()}
				<span>{notification.message}</span>
				<button className='close-btn' onClick={closeNotification}>
					<MdClose style={{ width: 20, height: 20, color: '#a33749' }} />
				</button>
			</div>
		</div>
	);
};
export default CustomNotification;
