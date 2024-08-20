import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { RiArrowUpSLine } from 'react-icons/ri';
import { HashLink } from 'react-router-hash-link';

function Layout() {
	return (
		<>
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
		</>
	);
}
export default Layout;
