import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import './EventItem.css';
function EventItem() {
	const today = new Date();
	const dateTwentyDaysAfter = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 50
	);
	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top;
		const yOffset = +(window.innerHeight * 0.3);
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};

	const events = LesMillsEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate >= today; //eventDate <= dateTwentyDaysAfter &&
	})
		.splice(0, 5)
		.map((event) => {
			const eventDate = new Date(event.date);
			const daysLeft = Math.floor(
				(eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24) + 1
			);

			return (
				<div className='event-item-inner-container' key={event.id}>
					<h3>Yaklaşan Etkinlik!</h3>
					<p className='event-text'>
						{eventDate.toLocaleDateString()} tarihinde {event.title}{' '}
						programından oluşan etkinliğimiz yakınlaşmakta!
						Etkinliğimize son {daysLeft} gün!
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

export default EventItem;
