import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IsIpBlocked = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const handleStorageChange = () => {
			navigate('/engellendi');
		};

		window.addEventListener('ipBlockedEvent', handleStorageChange);

		return () => {
			window.removeEventListener('ipBlockedEvent', handleStorageChange);
		};
	}, []);

	return null;
};

export default IsIpBlocked;
