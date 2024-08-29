import React, { useState } from 'react';
import './Events.css';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import CardCarousel from '../../components/Carousels/CardCarousel';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import PaginationContainer from '../../components/Containers/PaginationContainer';
import CalendarEventItem from '../../components/CalendarContainer/CalendarEventItem';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
function Events() {
	return (
		<>
			<div className='event-page-poster-container bottom-space'>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<img
					src={backgroundText}
					alt='events page hero'
					className='events-hero-text'
				/>

				<p className='text-container'></p>
			</div>
			<CalendarContainer />
			<PaginationContainer />
		</>
	);
}
export default Events;
