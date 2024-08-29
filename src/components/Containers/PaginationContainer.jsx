import React from 'react';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
function PaginationContainer() {
	const eventItems = EventExpandedItem();
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const eventsPerPage = 6;
	const lastIndex = paginationPageNumber * eventsPerPage;
	const firstIndex = lastIndex - eventsPerPage;
	const paginatedEvents = eventItems.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(eventItems.length / eventsPerPage);
	const paginationNumbers = [...Array(pageAmount + 1).keys()].slice(1);
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

	return (
		<>
			<div className='event-container'>
				{paginatedEvents.map((event, index) => {
					return (
						<div key={index} className='grid-event-item-container'>
							{/* <img
							src='/ornek.jpg'
							alt='event photo'
							className='background-image'
						/> */}
							{event}
						</div>
					);
				})}
			</div>
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
								paginationPageNumber === number
									? 'active'
									: 'inactive'
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
