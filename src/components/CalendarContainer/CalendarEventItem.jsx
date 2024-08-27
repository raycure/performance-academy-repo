import React from 'react';
import './CalendarEventItem.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
import Button from '../Button/Button';
import UpcomingEvents from './UpcomingEvents';
function CalendarEventItem({ eventId }) {
	const allEvents = LesMillsEvents;
	const today = new Date();

	if (!eventId) {
		return <UpcomingEvents />;
	}

	const activeEvent = allEvents.find((event) => {
		return eventId === event.id.toString();
	});
	const eventProgram = Object.keys(lesMillsPrograms)
		.map((category) => {
			return lesMillsPrograms[category].find((program) => {
				return program.id === activeEvent.program;
			});
		})
		.filter(Boolean);

	return (
		<div className='upcoming-events-container'>
			{Math.floor(
				(activeEvent.fullDate.getTime() - today.getTime()) /
					(1000 * 3600 * 24)
			) < 0 ? ( //tarihi geçen etkinliği göstermemek için
				<div className='border-container'>
					<img
						src={eventProgram[0]?.logo}
						alt='logo'
						className='img class-logo'
					/>
					<p>
						Bu etkinliğimizin maalesef tarihi geçmiştir. Başka
						etkinliklerimize göz atmaya devam edebilirsiniz!
					</p>
				</div>
			) : (
				<div className='border-container'>
					<img
						src={eventProgram[0]?.logo}
						alt='logo'
						className='img class-logo'
					/>
					<p>{eventProgram[0]?.sum}</p>
					<HashLink to={`/programlar#${activeEvent.program}`}>
						{activeEvent.program}
					</HashLink>
					<p>
						programını kapsayan bu etkinliğimize{' '}
						{Math.floor(
							(activeEvent.fullDate.getTime() - today.getTime()) /
								(1000 * 3600 * 24)
						)}{' '}
						gün kalmıştır.
					</p>
					<Button>Etkinliğe Katılın</Button>
				</div>
			)}
		</div>
	);
}
export default CalendarEventItem;
