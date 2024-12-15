// import { useTranslation } from 'react-i18next';

const errorHandler = (error) => {
	// const { t, i18n } = useTranslation('translation');
	function displayNotif() {
		const verifyNotif = {
			type: 'error',
			duration: 2000,
			message: error.payload.data.message,
		};
		localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	}
	if (error) {
		console.log('error exist in error handler', error);
		displayNotif();
	}
	console.log('error exist in error handler', error);
};

export default errorHandler;
