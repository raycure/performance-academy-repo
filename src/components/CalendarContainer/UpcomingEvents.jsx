import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
function UpcomingEvents() {
	const allEvents = LesMillsEvents;
	const today = new Date();
	const windowWidth = window.innerWidth;
	const eventAmount = windowWidth > 1380 ? 3 : windowWidth > 1170 ? 2 : 1;
	return (
		<div className='upcoming-events-container	'>
			<p className={windowWidth > 1160 ? 'fs-700' : 'fs-650'}>
				Yaklaşan Etkinlikler
			</p>
			{allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
				.filter((event) => {
					const eventDate = new Date(event.date);
					return eventDate >= today;
				})
				.slice(0, eventAmount)
				.map((event) => {
					const eventDate = new Date(event.date);
					const daysLeft = Math.floor(
						(eventDate.getTime() - today.getTime()) /
							(1000 * 3600 * 24)
					);
					return (
						<div className='border-container' key={event.id}>
							<HashLink to={`/programlar#${event.program}`}>
								{event.program}
							</HashLink>
							<p>
								etkinliğimiz yaklaşmakta, bu etkinliğe katılmak
								için {daysLeft} gününüz kaldı!
							</p>
							<Button>Etkinliğe Katılın</Button>
						</div>
					);
				})}
		</div>
	);
}
export default UpcomingEvents;
