import React from 'react';
import './CalendarEventItem.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
function CalendarEventItem({ eventClicked, event }) {
	const allEvents = LesMillsEvents;
	const today = new Date();
	return (
		<div className='bg-accent-400'>
			<p>{!eventClicked ? 'Yaklaşan Etkinlikler' : event.title}</p>
			{!eventClicked ? (
				allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
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
						return <div key={event.id}>{event.title}</div>;
					})
			) : (
				<div>meow</div>
			)}
		</div>
	);
}
export default CalendarEventItem;
