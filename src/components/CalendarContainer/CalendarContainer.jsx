import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import './CustomCalendar.css';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import CalendarEventItem from './CalendarEventItem';

function CalendarContainer() {
	const [eventClicked, setEventClicked] = useState(false);
	const [activeEvent, setActiveEvent] = useState(null);
	const events = LesMillsEvents;
	function handleEventClick(eventInfo) {
		setEventClicked(true);
		setActiveEvent(eventInfo.event._def);
		console.log(eventInfo.event.id);

		// const element = document.getElementById(
		// 	eventInfo.event.extendedProps.program
		// );
		// element?.scrollIntoView({
		// 	behavior: 'smooth',
		// });
	}
	function renderEvents(eventInfo) {
		return <></>;
	}
	return (
		<div className='calendar-container bg-primary-400'>
			<CalendarEventItem
				eventClicked={eventClicked}
				event={activeEvent}
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
