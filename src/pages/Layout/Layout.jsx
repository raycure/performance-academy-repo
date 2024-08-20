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
			<HashLink className='top-arrow' to='#top'>
				<RiArrowUpSLine />
			</HashLink>
		</>
	);
}
export default Layout;
