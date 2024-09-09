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
	// document.addEventListener('wheel', function (event) {
	// 	if (event.deltaY > 0) {
	// 		event.preventDefault();
	// 		smoothScroll(document.documentElement, 100, 100);
	// 	}
	// });
	// function smoothScroll(domElement, pixel, delay) {
	// 	const intervalToRepeat = 25;
	// 	const step = (intervalToRepeat * pixel) / delay;
	// 	if (step < pixel) {
	// 		domElement.scrollTop += step;
	// 		setTimeout(function () {
	// 			smoothScroll(domElement, pixel - step, delay);
	// 		}, intervalToRepeat);
	// 	}
	// }

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
