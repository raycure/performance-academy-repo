import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
import './CustomCalendar.css';

import { LesMillsEvents } from '../../assets/LesmillsEvents';
function CustomCalendar() {
	function handleEventClick() {}
	const events = LesMillsEvents;
	function renderEvents(eventInfo) {
		return (
			<>
				<b className='event-title'>{eventInfo.event.title}</b>
			</>
		);
	}
	function eventHoverHandler() {}
	return (
		<div className='cal-container'>
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
				eventMouseEnter={eventHoverHandler}
				eventBackgroundColor={events.color}
				eventTextColor='black'
			/>
		</div>
	);
}
export default CustomCalendar;
// eventRender: function(event, element) {
// 	element.find('.fc-event-inner').css("background","url(https://assets.pokemon.com/assets//cms2-es-es/img.jpg) no-repeat right");
// 	element.find('.fc-event-inner').css("background-size","contain");
// 	element.find('.fc-event-inner').css("opacity","0.75");
//  }  //bunu dennicem eventlerin backgroundunu image yapabiliyor muyuz diye, olmadı kendi yazdırmamın içine image koyup onu background yapcam
