import React, { useState } from 'react';
import './Events.css';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import CardCarousel from '../../components/Carousels/CardCarousel';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import PaginationContainer from '../../components/Containers/PaginationContainer';
import CalendarEventItem from '../../components/CalendarContainer/CalendarEventItem';
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

			<CalendarContainer />

			<PaginationContainer />
		</div>
	);
}
export default Events;
