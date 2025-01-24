import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { RiArrowUpSLine } from 'react-icons/ri';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import CookieConsent from '../Legal/Cookies.jsx';
import CustomNotification from '../../components/Notification/Notification.jsx';
import IsIpBlocked from '../../components/IpBlocked/IsIpBlocked.jsx';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

//import SmoothScrollContainer from '../../components/Containers/SmoothScrollContainer';
function Layout() {
	const Wrapper = ({ children }) => {
		//for going to top of the page on path change
		const location = useLocation();
		useLayoutEffect(() => {
			document.documentElement.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant',
			});
		}, [location.pathname]);
		return children;
	};
	const displayNotif = (Notifexp) => {
		localStorage.setItem('Notifexp', JSON.stringify(Notifexp));
		const notificationEvent = new Event('notificationEvent');
		window.dispatchEvent(notificationEvent);
	};

	const [searchParams] = useSearchParams();
	useEffect(() => {
		const status = searchParams.get('status');
		const message = searchParams.get('message');
		if (status === 'success') {
			const successNotification = {
				type: 'success',
				duration: 3000,
				message: message,
			};
			displayNotif(successNotification);
			const newUrl = window.location.pathname;
			window.history.replaceState({}, '', newUrl);
		} else if (status === 'error') {
			const errorNotification = {
				type: 'error',
				duration: 3000,
				message: message,
			};
			displayNotif(errorNotification);
			const newUrl = window.location.pathname;
			window.history.replaceState({}, '', newUrl);
		}
	}, [searchParams]);

	return (
		//<SmoothScrollContainer>
		<Wrapper>
			<Navbar />
			<CustomNotification />
			<IsIpBlocked />
			<Outlet />
			<Footer />
			<CookieConsent />
			<HashLink
				aria-label='return top arrow'
				className='to-top-arrow'
				to='#top'
			>
				<RiArrowUpSLine size='2rem' opacity={0.7} />
			</HashLink>
		</Wrapper>
	);
}
export default Layout;
