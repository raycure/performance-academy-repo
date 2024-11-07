import React, { useState } from 'react';
import './Events.css';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import PaginationContainer from '../../components/Containers/PaginationContainer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
function Events() {
	return (
		<>
			<div className='page-poster-container '>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<img
					src={backgroundText}
					alt='events page hero'
					style={{ position: 'relative', alignSelf: 'center', height: '50%' }}
				/>
			</div>
			<div className='dark-background'>
				<CalendarContainer />
			</div>
			{/* <PaginationContainer /> */}
		</>
	);
}
export default Events;
