import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { RiArrowUpSLine } from 'react-icons/ri';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import CustomNotification from '../../components/Notification/Notification.jsx';

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
	return (
		//<SmoothScrollContainer>
		<Wrapper>
			<Navbar />
			<CustomNotification />
			<Outlet />
			<Footer />
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
