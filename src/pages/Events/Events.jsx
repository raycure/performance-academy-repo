import React, { useState } from 'react';
import './Events.css';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import PaginationContainer from '../../components/Containers/PaginationContainer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
function Events() {
	// const { pathname } = useLocation();
	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// }, [pathname]);

	// const classes = Object.keys(LesmillsPrograms()).map((category) =>
	// 	LesmillsPrograms()[category].map((program) => {
	// 		return (
	// 			<button
	// 				className={`light-container ${
	// 					programID === program.id && 'bg-primary-300'
	// 				}`}
	// 				key={program.id}
	// 				onClick={() => {
	// 					setProgramID(program.id);
	// 				}}
	// 			>
	// 				<img
	// 					aria-label='logo'
	// 					className='img category-logo'
	// 					src={program.logo}
	// 				/>
	// 			</button>
	// 		);
	// 	})
	// );
	// <section className='enroll-category'>{classes}</section>

	return (
		<>
			<div className='page-poster-container bottom-space'>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<img
					src={backgroundText}
					alt='events page hero'
					style={{ position: 'relative', alignSelf: 'center', height: '70%' }}
				/>
			</div>
			<div className='dark-background bottom-space'>
				<CalendarContainer />
			</div>
			<PaginationContainer />
		</>
	);
}
export default Events;
