import React, { useEffect } from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import './EventItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEventId } from '../../redux/Slices/CalendarEventSlice.js';
import { setId } from '../../redux/Slices/ProgramIdSlice.js';
import Button from '../Button/Button.jsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function EventItem() {
	const today = new Date();
	const dateTwentyDaysAfter = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 50
	);
	useEffect(() => {
		const animatedElements = document.querySelectorAll('.addLineAnimation');

		animatedElements.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				element.classList.add('lineAnimation');
				element.addEventListener('mouseleave', () => {
					element.classList.add('notHoveredLineAnimation');
				});
				element.classList.remove('notHoveredLineAnimation');
			});
		});
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleCalendarEventSelect = (id) => {
		dispatch(setEventId(id));
		navigate('/etkinlikler', {
			state: { scrollToElement: true, elementId: 'event-select-form' },
		});
	};
	const { i18n } = useTranslation('translation');
	const handleSelectId = (id) => {
		dispatch(setId(id));
		navigate('/program');
	};

	const events = LesMillsEvents.filter((event) => {
		return event.fullStartDate >= today; //event.fullStartDate <= dateTwentyDaysAfter &&
	})
		.splice(0, 6)
		.map((event) => {
			const daysLeft = Math.floor(
				(event.fullStartDate.getTime() - today.getTime()) / (1000 * 3600 * 24) +
					1
			);

			return (
				<div className='event-item-inner-container' key={event.id}>
					<h3 style={{ fontWeight: 'bolder' }} className='fs-minimal-heading'>
						{event.program}
					</h3>
					<p className='event-text'>
						{i18n.language === 'en' ? (
							<>
								The {event.title} event that will be held between the
								{event.fullStartDate.toLocaleDateString()} dates is approaching
								!There's only {daysLeft} days left if you're considering
								joining!
							</>
						) : (
							<>
								{event.fullStartDate.toLocaleDateString()} tarihleri arasında
								yapılacak olan {event.title} etkinliğimiz yakınlaşmakta!
								Etkinliğimize katılmak için son {daysLeft} gün kaldı!
							</>
						)}
					</p>
					<Link
						onClick={() => handleSelectId(event.program)}
						className='addLineAnimation'
						style={{ width: 'fit-content' }}
						to={'/program'}
					>
						{i18n.language === 'en'
							? 'Click to view the program'
							: 'Programı incelemek için buraya tıklayın'}
						!
					</Link>

					<Button onClick={() => handleCalendarEventSelect(event.id)}>
						{i18n.language === 'en' ? 'Join Event' : 'Etkinliğe Katılın'}
					</Button>
				</div>
			);
		});

	return events.length ? events : null;
}

export default EventItem;
