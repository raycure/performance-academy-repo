import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import './CustomCalendar.css';
function CustomCalendar() {
	function handleEventClick() {}
	const events = [
		{
			id: 1,
			title: 'meow',
			date: '2024-08-20',
			color: '#d4006a',
		},
	]; //we'll add the events throught here
	function renderEvents(eventInfo) {
		return (
			<>
				<p>{eventInfo.title}</p>
			</>
		);
	}
	function eventHoverHandler() {}
	return (
		<div className='cal-container'>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView='dayGridMonth'
				events={events}
				eventClick={handleEventClick}
				eventContent={renderEvents}
				eventMouseEnter={eventHoverHandler}
				eventDisplay='background'
				eventBackgroundColor={events.color}
				eventTextColor='black'
				editable={false}
			/>
		</div>
	);
}
export default CustomCalendar;
