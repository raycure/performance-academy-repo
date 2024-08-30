import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import './CustomCalendar.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import CalendarEventItem from './CalendarEventItem';

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
	function renderEvents(eventInfo) {
		const eventDate = new Date(
			eventInfo.event._instance.range.start
		).getDate();
		return <div className='fully-center-item'>{eventDate}</div>;
	}

	return (
		<div
			id='calendar-container'
			className='calendar-container bg-primary-400 bottom-space'
		>
			<CalendarEventItem
				eventClicked={eventClicked}
				eventId={activeEventId}
			/>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				locale='tr'
				buttonText={{ today: 'Bugün' }}
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
				eventBackgroundColor={events.color}
			/>
		</div>
	);
}
export default CalendarContainer;
