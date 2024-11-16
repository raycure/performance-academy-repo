import React, { useEffect } from 'react';
import ProgramOverview from '../../components/ProgramOverview/ProgramOverview';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MyPrograms() {
	const userEventIDs = ['1', '3'];
	const navigate = useNavigate();

	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		if (!isLoggedIn) {
			const verifyNotif = {
				type: 'info',
				duration: 5000,
				message: 'Please login',
			};
			localStorage.setItem('Notifexp', JSON.stringify(verifyNotif));
			const notificationEvent = new Event('notificationEvent');
			window.dispatchEvent(notificationEvent);
			navigate('/login');
		}
	}, []);
	return (
		<section>
			{userEventIDs.map((id) => {
				return (
					<div key={id}>
						<ProgramOverview eventID={id} />
					</div>
				);
			})}
		</section>
	);
}
export default MyPrograms;
