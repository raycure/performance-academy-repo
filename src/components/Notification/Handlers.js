const errorHandler = (error) => {
	function displayNotif() {
		const verifyNotif = {
			type: 'error',
			duration: error.payload.data.duration || 2500,
			message: error.payload.data.message,
		};
		localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	}
	displayNotif();
};

const successHandler = (response) => {
	function displayNotif() {
		const verifyNotif = {
			type: 'success',
			duration: response.payload.data.duration || 2500,
			message: response.payload.data.message,
		};
		localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	}
	displayNotif();
};

export { successHandler, errorHandler };
