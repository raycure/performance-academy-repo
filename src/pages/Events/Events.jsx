import React, { useState } from 'react';
import './Events.css';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import CardCarousel from '../../components/Carousels/CardCarousel';
import EventExpandedItem from '../../components/EventItem/EventExpandedItem';
import PaginationContainer from '../../components/Containers/PaginationContainer';
import CalendarEventItem from '../../components/CalendarContainer/CalendarEventItem';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { useTranslation } from 'react-i18next';
function Events() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	const { t, i18n } = useTranslation('translation');
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
					className='events-hero-text'
				/>

				<p className='text-container'></p>
			</div>
			<p>{t('localizationTesting')}</p>
			<CalendarContainer />
			<PaginationContainer />
		</>
	);
}
export default Events;
