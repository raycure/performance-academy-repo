'use client';
import React, { useEffect, useRef } from 'react';
import './containerStyle.css';
//import useWindowSize from '../../hooks/useWindowSize';

const SmoothScrollContainer = ({ children }) => {
	const windowSize = () => {
		const getSize = () => {
			return {
				width: window.innerWidth,
				height: window.innerHeight,
			};
		};

		const [windowSize, setWindowSize] = useState(getSize);

		useEffect(() => {
			const handleResize = () => {
				setWindowSize(getSize());
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);

		return windowSize;
	};

	//2.
	const scrollingContainerRef = useRef();

	// 3.
	const data = {
		ease: 0.05,
		current: 0,
		previous: 0,
		rounded: 0,
	};

	// 4.
	useEffect(() => {
		setBodyHeight();
	}, [windowSize.height]);

	const setBodyHeight = () => {
		document.body.style.height = `${
			scrollingContainerRef.current.getBoundingClientRect().height
		}px`;
	};

	// 5.
	useEffect(() => {
		requestAnimationFrame(() => smoothScrollingHandler());
	}, []);

	const smoothScrollingHandler = () => {
		data.current = window.scrollY;
		data.previous += (data.current - data.previous) * data.ease;
		data.rounded = Math.round(data.previous * 100) / 100;

		scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

		// Recursive call
		requestAnimationFrame(() => smoothScrollingHandler());
	};

	return (
		<div className='scrolling-parent'>
			<div ref={scrollingContainerRef}>{children}</div>
		</div>
	);
};

export default SmoothScrollContainer;
