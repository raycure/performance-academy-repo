import React, { useEffect, useRef, useState, createRef } from 'react';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { motion, useAnimation, useInView } from 'framer-motion';

function PaginationContainer() {
	//const lineRefs = useRef([]);
	const eventItems = EventExpandedItem();
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const windowWidth = window.innerWidth;
	const eventsPerPage = windowWidth > 640 ? 6 : 3;
	const lastIndex = paginationPageNumber * eventsPerPage;
	const firstIndex = lastIndex - eventsPerPage;
	const paginatedEvents = eventItems.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(eventItems.length / eventsPerPage);
	const paginationNumbers = [...Array(pageAmount + 1).keys()].slice(1);
	// const mainControls = useAnimation();
	// const inViewStates = paginatedEvents.map(() => useRef(false));

	// function scrollToTheTop(ref) {
	// 	if (ref.current) {
	// 		const headerElement = document.querySelector(
	// 			'.navigation-outer-container'
	// 		);
	// 		const headerHeight = headerElement ? headerElement.offsetHeight : 0;

	// 		const offsetTop = ref.current.offsetTop;
	// 		window.scrollTo({
	// 			top: offsetTop - headerHeight,
	// 			behavior: 'smooth',
	// 		});
	// 	}
	// }

	function prePage() {
		if (paginationPageNumber !== 1) {
			setPaginationPageNumber(paginationPageNumber - 1);
		}
	}

	function nextPage() {
		if (paginationPageNumber !== pageAmount) {
			setPaginationPageNumber(paginationPageNumber + 1);
		}
	}

	function changePageNumber(id) {
		setPaginationPageNumber(id);
	}

	// useEffect(() => {
	// 	console.log('look', lineRefs.current);
	// }, []);

	return (
		<>
			<motion.div className='event-container' style={{ overflow: 'scroll' }}>
				{paginatedEvents.map((event, index) => {
					// if (!lineRefs.current[index]) {
					// 	lineRefs.current[index] = createRef();
					// }

					// const isInView = useInView(lineRefs.current[index]);

					// useEffect(() => {
					// 	if (isInView) {
					// 		{
					// 			/* console.log(isInView, lineRefs.current[index]); */
					// 		}
					// 		mainControls.start('visible');
					// 	}
					// }, [isInView, mainControls]);

					return (
						<motion.div
							key={index}
							//initial='hidden'
							//ref={lineRefs.current[index]}
							//animate={mainControls}
							//onClick={() => scrollToTheTop(lineRefs.current[index])}
							// variants={{
							// 	hidden: {
							// 		opacity: 0,
							// 		x: -40,
							// 	},
							// 	visible: {
							// 		x: 0,
							// 		opacity: 1,
							// 	},
							// }}
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
			<div className='event-pagination-container bottom-space'>
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
