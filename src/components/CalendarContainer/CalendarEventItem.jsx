import React from 'react';
import './CalendarEventItem.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import UpcomingEvents from './UpcomingEvents';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setEventId } from '../../redux/Slices/CalendarEventSlice.js';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
function CalendarEventItem({ eventId }) {
	const { i18n, t } = useTranslation('');
	const programs = LesmillsPrograms();
	const events = LesMillsEvents;
	const today = new Date();
	const dispatch = useDispatch();
	const handleCalendarEventSelect = (id) => {
		dispatch(setEventId(id));
		const element = document.getElementById('event-select-form');
		const offset = 200;
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	};
	if (!eventId) {
		return <UpcomingEvents />;
	}
	const activeEvent = events.find((program) => {
		return eventId === program.id.toString();
	});
	const eventProgram = Object.keys(programs)
		.map((category) => {
			return programs[category].find((program) => {
				return program.id === activeEvent.program;
			});
		})
		.filter(Boolean);

	return (
		<div className='upcoming-events-container selected-events'>
			{activeEvent.fullStartDate <= today ? (
				<div className='border-container'>
					<HashLink className='' to={`/programlar#${eventProgram[0]?.id}`}>
						<img
							src={eventProgram[0]?.logo}
							alt='logo'
							className='img class-logo'
						/>
					</HashLink>
					<p>
						{i18n.language === 'en'
							? 'Unfortunately this event has passed. You can continue looking through our other events.'
							: 'Bu etkinliğimizin maalesef tarihi geçmiştir. Başka etkinliklerimize göz atmaya devam edebilirsiniz!'}
					</p>
				</div>
			) : (
				<div className='border-container'>
					<HashLink className='' to={`/programlar#${eventProgram[0]?.id}`}>
						<img
							src={eventProgram[0]?.logo}
							alt='logo'
							className='img class-logo'
						/>
					</HashLink>
					<p id='calendar-item-sum'>{eventProgram[0]?.sum}</p>
					{i18n.language === 'en' ? (
						<p>
							There's only
							{Math.floor(
								(activeEvent.fullStartDate.getTime() - today.getTime()) /
									(1000 * 3600 * 24) +
									1
							)}{' '}
							days till our {activeEvent.program} event. If you're interested in
							this event join before it passes!
						</p>
					) : (
						<p>
							{activeEvent.program} programını kapsayan bu etkinliğimize{' '}
							{Math.floor(
								(activeEvent.fullStartDate.getTime() - today.getTime()) /
									(1000 * 3600 * 24) +
									1
							)}{' '}
							gün kalmıştır. Bu etkinliğimizle ilgileniyorsanız kaçırmadan
							katılın!
						</p>
					)}

					<Button onClick={() => handleCalendarEventSelect(activeEvent.id)}>
						{i18n.language === 'en' ? 'Join Event' : 'Etkinliğe Katılın'}
					</Button>
				</div>
			)}
		</div>
	);
}
export default CalendarEventItem;
