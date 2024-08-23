import React, { useState } from 'react';
import './Events.css';
import CustomCalendar from '../../components/CustomCalendar/CustomCalendar';
import CardCarousel from '../../components/Carousels/CardCarousel';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import PaginationContainer from '../../components/Containers/PaginationContainer';
function Events() {
	return (
		<div>
			<div className='event-page-poster-container'>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<p className='text-container'></p>
			</div>
			<div className='calender-carousel-container'>
				<div className='calendar-container bg-primary-400'>
					<CustomCalendar />
				</div>
				<div className='carousel-container'>
					<CardCarousel />
				</div>
			</div>
			<PaginationContainer />
		</div>
	);
}
export default Events;
