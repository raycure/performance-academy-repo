import React, { useState, useEffect } from 'react';
import './notificationStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoInfo } from 'react-icons/go';
import { FiCheckCircle } from 'react-icons/fi';

import { FiXCircle } from 'react-icons/fi';

const Notification = ({ message, type, duration = 3000000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);
		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const renderIcon = () => {
		switch (type) {
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
		<div className={`notification ${type}`}>
			<button className='close-btn' onClick={onClose}>
				{renderIcon()}
			</button>
			{message}
		</div>
	);
};

export default Notification;

{
	/* <GoInfo style={{ width: 20, height: 20 }} />
<FiCheckCircle style={{ width: 20, height: 20 }} /> */
}
