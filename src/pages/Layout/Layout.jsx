import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { RiArrowUpSLine } from 'react-icons/ri';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
function Layout() {
	const Wrapper = ({ children }) => {
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
		<Wrapper>
			<Navbar />
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
