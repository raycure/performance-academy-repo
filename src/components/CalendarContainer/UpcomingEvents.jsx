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
	const windowWidth = window.innerWidth;
	const eventAmount = windowWidth > 1200 ? 2 : 1;
	const { t, i18n } = useTranslation('');
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
				{i18n.language === 'en' ? 'Upcoming Events' : 'Yaklaşan Etkinlikler'}
			</p>
			{allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
				.filter((event) => {
					return event.fullStartDate >= today;
				})
				.slice(0, eventAmount)
				.map((event) => {
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
						<div className='border-container' key={event.id}>
							<HashLink smooth={true} to={`/programlar#${event.program}`}>
								<img
									className='img class-logo'
									src={eventProgram[0]?.logo}
									alt=''
								/>
							</HashLink>
							{i18n.language === 'en' ? (
								<p style={{ textAlign: 'center' }}>
									Last {daysLeft} days to join this event!
								</p>
							) : (
								<p style={{ textAlign: 'center' }}>
									Etkinliğimize katılmak için son {daysLeft} gününüz kaldı!
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
