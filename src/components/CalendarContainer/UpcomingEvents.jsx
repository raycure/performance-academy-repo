import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setEventId } from '../../redux/Slices/CalendarEventSlice.js';
function UpcomingEvents() {
	const lesMillsPrograms = LesMillsPrograms();
	const allEvents = LesMillsEvents;
	const today = new Date();
	const eventAmount = 1;
	const { i18n } = useTranslation('');
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
	return (
		<div className='upcoming-events-container	upcoming-events'>
			<p className='fs-700'>
				{i18n.language === 'en' ? 'Upcoming Event' : 'Yaklaşan Etkinlik'}
			</p>
			{allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
				.filter((event) => {
					return event.fullStartDate >= today;
				})
				.slice(0, eventAmount)
				.map((event, index) => {
					const daysLeft = Math.floor(
						(event.fullStartDate.getTime() - today.getTime()) /
							(1000 * 3600 * 24) +
							1
					);
					const eventProgram = Object.keys(lesMillsPrograms)
						.map((category) => {
							return lesMillsPrograms[category].find((program) => {
								return program.id === event.program;
							});
						})
						.filter(Boolean);
					return (
						<div key={index} className='border-container'>
							<HashLink smooth={true} to={`/programlar#${event.program}`}>
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
									{daysLeft} days till our {event.program} event. If you're
									interested in this event join before it passes!
								</p>
							) : (
								<p>
									{event.program} programını kapsayan bu etkinliğimize{' '}
									{daysLeft} gün kalmıştır. Bu etkinliğimizle ilgileniyorsanız
									kaçırmadan katılın!
								</p>
							)}

							<Button onClick={() => handleCalendarEventSelect(event.id)}>
								{i18n.language === 'en' ? 'Join Event' : 'Etkinliğe Katılın'}
							</Button>
						</div>
					);
				})}
		</div>
	);
}
export default UpcomingEvents;
