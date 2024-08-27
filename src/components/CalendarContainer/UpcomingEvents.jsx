import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
function UpcomingEvents() {
	const allEvents = LesMillsEvents;
	const today = new Date();
	return (
		<div className='upcoming-events-container	'>
			<p className='fs-secondary-heading'>'Yaklaşan Etkinlikler'</p>
			{allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
				.filter((event) => {
					const eventDate = new Date(event.date);
					return eventDate >= today;
				})
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
							<button>Etkinliğe Katılın</button>
						</div>
					);
				})}
		</div>
	);
}
export default UpcomingEvents;
