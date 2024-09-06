import React from 'react';
// import './testStyle.css';
// import './Register-Login/formStyle.css';/
import Notification from '../components/Notification/Notification';
import { useState, useEffect } from 'react';
import '../components/Notification/notificationStyle.css';

function Test() {
	const [notification, setNotification] = useState(null);

	const showNotification = (message, type) => {
		setNotification({ message, type });
	};

	const handleCloseNotification = () => {
		setNotification(null);
	};
	return (
		// <div class='carddd'>
		// 	<textarea
		// 		className='custom-textarea'
		// 		placeholder='Mesajınız...'
		// 		rows='5'
		// 		data-role='none'
		// 	></textarea>
		// 	<span class='top'></span>
		// 	<span class='right'></span>
		// 	<span class='bottom'></span>
		// 	<span class='left'></span>
		// </div >
		<div className='testt'>
			<button
				onClick={() =>
					showNotification('Success! Operation completed.', 'success')
				}
			>
				Show Success Notification
			</button>
			<button
				onClick={() =>
					showNotification('Error! Something went wrong.', 'error')
				}
			>
				Show Error Notification
			</button>
			<button
				onClick={() =>
					showNotification('Info! Here is some information.', 'info')
				}
			>
				Show Info Notification
			</button>

			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={handleCloseNotification}
				/>
			)}
		</div>
	);
}

export default Test;
