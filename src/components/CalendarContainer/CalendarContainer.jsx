import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import './CustomCalendar.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import CalendarEventItem from './CalendarEventItem';
import { useTranslation } from 'react-i18next';
import LesmillsPrograms from '../../assets/LesmillsPrograms';

function CalendarContainer() {
	const [eventClicked, setEventClicked] = useState(false);
	const [activeEventId, setActiveEventId] = useState(null);
	const events = LesMillsEvents;
	const windowWidth = window.innerWidth;
	function handleEventClick(eventInfo) {
		setEventClicked(true);
		const clickedEventId = eventInfo.event._def.publicId;
		setActiveEventId(clickedEventId);
		if (windowWidth <= 970) {
			// scrolls to the event info the event is clicked only on mobile
			const element = document.getElementById('calendar-container');
			const elementRect = element.getBoundingClientRect();
			const elementTop = elementRect.top + window.scrollY;
			const elementHeight = element.scrollHeight;
			element.style.height = elementHeight;
			const header = document.querySelector('.nav-container');
			const headerHeight = header ? header.offsetHeight : 0;
			window.scrollTo({
				top: elementTop - headerHeight,
				behavior: 'smooth',
			});
		}
	}
	const { t, i18n } = useTranslation();
	const programs = LesmillsPrograms();
	function renderEvents(eventInfo) {
		const eventProgramId = eventInfo.event._def.extendedProps.program;
		const eventProgram = Object.keys(programs)
			.map((category) => {
				return programs[category].find(
					(program) => program.id === eventProgramId
				);
			})
			.find((program) => program !== undefined);
		const diffTime = Math.abs(
			eventInfo.event._instance.range.end -
				eventInfo.event._instance.range.start
		);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		if (eventProgram && diffDays > 1) {
			return (
				<img
					className='center-item'
					style={{ maxWidth: '8rem', maxHeight: '100%' }}
					src={eventProgram.logo}
					alt={eventProgram.title}
				/>
			);
		} else if (diffDays > 1) {
			return (
				<div
					style={{ maxWidth: '8rem', maxHeight: '100%', fontWeight: 'bolder' }}
				>
					{eventInfo.event._def.extendedProps.program}
				</div>
			);
		}
		return;
	}

	return (
		<div
			id='calendar-container'
			className='calendar-container user-select-none bg-primary-500'
		>
			<CalendarEventItem eventClicked={eventClicked} eventId={activeEventId} />
			<div style={{ maxWidth: '90vh' }}>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView='dayGridMonth'
					locale={i18n.language}
					buttonText={
						i18n.language === 'tr' ? { today: 'Bugün' } : { today: 'Today' }
					}
					editable={false}
					aspectRatio={1.1}
					headerToolbar={{
						start: 'today',
						center: 'title',
						end: 'prev,next',
					}}
					eventDisplay='background'
					events={events}
					eventClick={handleEventClick}
					eventContent={renderEvents}
					validRange={{ start: '2024-11-01', end: '2025-04-01' }} //we're gonna put the range of the events here
				/>
			</div>
		</div>
	);
}
export default CalendarContainer;
