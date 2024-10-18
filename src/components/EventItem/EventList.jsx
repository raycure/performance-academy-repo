import React, { useEffect } from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import '../../pages/Enroll/Enroll.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
function EventList({ activeProgram, programTitle }) {
	const today = new Date();
	const { t, i18n } = useTranslation('programs');
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
	return (
		<>
			{LesMillsEvents.filter((event) => {
				const eventDate = new Date(event.date);
				return event.program === activeProgram && eventDate >= today;
			}).map((event, index) => {
				return (
					<section className='enroll-event-item' key={index}>
						<p style={{ alignContent: 'center' }}>{programTitle}</p>
						<p style={{ alignContent: 'center' }}>
							{event.fullDate.getDate() +
								' ' +
								event.fullDate.toLocaleString(i18n.language, {
									month: 'short',
								})}
						</p>
						<p style={{ alignContent: 'center' }}>{event.price}</p>

						<div
							style={{
								gap: '1rem',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Link
								to={'/program#' + event.program}
								state={{ program: event.program }}
								style={{
									alignItems: 'center',
									height: 'fit-content	',
								}}
								className='addLineAnimation'
							>
								Programı İncele
							</Link>
							<Button>Şimdi Al!</Button>
						</div>
					</section>
				);
			})}
		</>
	);
}
export default EventList;
