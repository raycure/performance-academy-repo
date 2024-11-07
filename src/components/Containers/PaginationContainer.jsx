import React, { useRef, useState } from 'react';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { motion, useAnimation, useInView } from 'framer-motion';

function PaginationContainer() {
	const eventItems = EventExpandedItem();
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const windowWidth = window.innerWidth;
	const eventsPerPage = windowWidth > 640 ? 6 : 3;
	const lastIndex = paginationPageNumber * eventsPerPage;
	const firstIndex = lastIndex - eventsPerPage;
	const paginatedEvents = eventItems.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(eventItems.length / eventsPerPage);
	const paginationNumbers = [...Array(pageAmount + 1).keys()].slice(1);
	const paginationRef = useRef(null);
	const executeScroll = () => {
		const header = document.querySelector('.nav-container');
		const headerHeight = header ? header.offsetHeight : 0;
		if (paginationRef.current) {
			const targetPosition =
				paginationRef.current.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({
				top: targetPosition - headerHeight,
				behavior: 'smooth',
			});
		}
	};
	function prePage() {
		if (paginationPageNumber !== 1) {
			setPaginationPageNumber(paginationPageNumber - 1);
		}
		executeScroll();
	}

	function nextPage() {
		if (paginationPageNumber !== pageAmount) {
			setPaginationPageNumber(paginationPageNumber + 1);
		}
		executeScroll();
	}

	function changePageNumber(id) {
		setPaginationPageNumber(id);
		executeScroll();
	}
	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
		const header = document.querySelector('.nav-container');
		const headerHeight = header ? header.offsetHeight : 0;
		const yOffset = -headerHeight;

		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};
	return (
		<>
			<motion.div
				id='event-pagination'
				ref={paginationRef}
				className='event-container'
				style={{ overflow: 'scroll' }}
			>
				{paginatedEvents.map((event, index) => {
					return (
						<motion.div
							key={index}
							transition={{ delay: 0.35 }}
							viewport={{ amount: 0.1 }}
							className='grid-event-item-container'
						>
							{/* <img
							src='/ornek.jpg'
							alt='event photo'
							className='background-image'
						/> */}
							{event}
						</motion.div>
					);
				})}
			</motion.div>
			<div className='event-pagination-container'>
				<button
					className={`event-pagination-item ${
						paginationPageNumber === 1 && 'display-hidden'
					}`}
					onClick={prePage}
				>
					<MdArrowBackIosNew />
				</button>
				<div className=''>
					{paginationNumbers.map((number, index) => (
						<button
							onClick={() => changePageNumber(number)}
							className={`event-pagination-item ${
								paginationPageNumber === number ? 'active' : 'inactive'
							}`}
							key={index}
						>
							{number}
						</button>
					))}
				</div>
				<button
					className={`event-pagination-item ${
						paginationPageNumber === pageAmount && 'display-hidden'
					}`}
					onClick={nextPage}
				>
					<MdArrowForwardIos />
				</button>
			</div>
		</>
	);
}

export default PaginationContainer;
