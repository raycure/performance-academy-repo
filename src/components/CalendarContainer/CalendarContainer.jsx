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
	const { t, i18n } = useTranslation();
	const eventColorData = {
		'LES-MILLS-GRIT': '#2f316b',
		'BORN-TO-MOVE': '#7ab6c7',
		'LES-MILLS-CORE': '#e24c35',
		BODYPUMP: '#f18882',
		BODYCOMBAT: '#cda653',
		'LES-MILLS-SPRINT': '#7a552f',
		'THE-TRIP': '#cb00ad',
		'SH’BAM': '#c980cb',
		BODYBALANCE: '#9900ff',
		BODYATTACK: '#5398c3',
		RPM: '#082e51',
		BODYJAM: '#dd8b34',
		BODYSTEP: '#00565b',
		'LES-MILLS-TONE': '#abd633',
		'LES-MILLS-BARRE': '#5d83c5',
	};
	const today = new Date();
	const events = LesMillsEvents.map((event) => {
		return {
			...event,
			end: new Date(
				new Date(event.end).setDate(new Date(event.end).getDate() + 1)
			)
				.toISOString()
				.split('T')[0],
			color:
				today <= event.fullStartDate
					? eventColorData[event.program]
					: '#888888',
		};
	});
	const windowWidth = window.innerWidth;
	const programs = LesmillsPrograms();
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
		return eventProgram && diffDays > 1 ? (
			<img
				className='center-item'
				style={{
					maxWidth: '100%',
					maxHeight: '100%',
					width: 'auto',
				}}
				src={eventProgram.logo}
				alt={eventProgram.title}
			/>
		) : diffDays > 1 ? (
			<div
				style={{ maxWidth: '8rem', maxHeight: '100%', fontWeight: 'bolder' }}
			>
				{eventInfo.event._def.extendedProps.program}
			</div>
		) : (
			<></>
		);
	}

	return (
		<div
			id='calendar-container'
			className='calendar-container user-select-none'
		>
			<CalendarEventItem eventClicked={eventClicked} eventId={activeEventId} />
			<div style={{ maxWidth: '80vh', margin: '1rem' }}>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView='dayGridMonth'
					locale={i18n.language}
					buttonText={
						i18n.language === 'tr' ? { today: 'Bugün' } : { today: 'Today' }
					}
					firstDay={1}
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
					validRange={{ start: '2025-01-01', end: '2025-07-01' }} //we're gonna put the range of the events here
				/>
			</div>
		</div>
	);
}
export default CalendarContainer;
