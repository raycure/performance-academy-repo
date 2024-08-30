import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import './EventItem.css';
function EventExpandedItem() {
	const today = new Date();
	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
		const yOffset = -(window.innerHeight * 0.2);
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};
	// const dateTwentyDaysAfter = new Date(
	// 	today.getFullYear(),
	// 	today.getMonth(),
	// 	today.getDate() + 100
	// );
	const events = LesMillsEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate >= today; //eventDate <= dateTwentyDaysAfter &&
	}).map((event) => {
		const eventDate = new Date(event.date);
		const daysLeft = Math.floor(
			(eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24) + 1
		);

		return (
			<div
				className='event-item-center event-item-container'
				key={event.id}
				id={event.program}
			>
				<h3>{event.title}</h3>
				<p className='event-text'>
					{eventDate.toLocaleDateString()} tarihinde {event.title}{' '}
					programından oluşan etkinliğimiz yakınlaşmakta!
					Etkinliğimize son {daysLeft} gün! cokcokcooooookk text
				</p>
				<HashLink
					smooth
					to={`/programlar#${event.program}`}
					scroll={scrollWithOffset}
				>
					Programı incelemek için buraya tıklayın!
				</HashLink>
			</div>
		);
	});

	return events.length ? events : null;
}

export default EventExpandedItem;
