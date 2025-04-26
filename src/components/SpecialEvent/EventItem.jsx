import React, { useEffect } from 'react';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { HashLink } from 'react-router-hash-link';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { setEventId } from '../../redux/Slices/CalendarEventSlice.js';
import { LesMillsEvents } from '../../assets/LesmillsEvents.jsx';
function EventItem({ poster, program, flexDirection, text, eventId }) {
	const programs = LesmillsPrograms();
	const eventProgram = Object.values(programs)
		.flat()
		.find((Program) => Program.id === program);

	const eventProgramLogo = eventProgram?.logo;
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
	const activeEvent = LesMillsEvents.find((program) => {
		return eventId === program.id.toString();
	});
	const handleEventSelect = (id) => {
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
		<div
			className={`special-event-item-con ${
				flexDirection == 'row-reverse' ? 'special-event-item-reverse' : ''
			}`}
		>
			<img className='special-event-poster' src={poster} />
			<div
				className={`special-event-item-inner-con ${
					flexDirection == 'row-reverse'
						? 'special-event-item-inner-reverse-con'
						: ''
				}`}
			>
				<img
					src={eventProgramLogo}
					alt='logo'
					className='img'
					style={{ width: '160px', marginBlock: 8 }}
				/>
				<p>{text}</p>
				<HashLink
					to=''
					smooth
					style={{
						display: 'flex',
						gap: '0.3rem',
						width: 'fit-content',
					}}
					className='process-contact-link addLineAnimation'
				>
					Program hakkında{' '}
					<IoMdArrowRoundForward
						style={{
							position: 'relative',
							top: '2px',
							width: '1.2rem',
							height: '100%',
						}}
						className='process-contact-icon'
					/>
				</HashLink>
				<Button onClick={() => handleEventSelect(activeEvent.id)}>
					Etkinliğe Katılın
				</Button>
			</div>
		</div>
	);
}
export default EventItem;
