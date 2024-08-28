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

	function handleEventClick(eventInfo) {
		setEventClicked(true);
		const clickedEventId = eventInfo.event._def.publicId;
		setActiveEventId(clickedEventId);
		// console.log(activeEvent);
		// console.log(typeof clickedEventId);
		// const element = document.getElementById(
		// 	eventInfo.event.extendedProps.program
		// );
		// element?.scrollIntoView({
		// 	behavior: 'smooth',
		// });
	}
	function renderEvents(eventInfo) {
		const eventDate = new Date(
			eventInfo.event._instance.range.start
		).getDate();
		return <div className='fully-center-item'>{eventDate}</div>;
	}

	return (
		<div className='calendar-container bg-primary-400'>
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
