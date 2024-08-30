import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { HashLink } from 'react-router-hash-link';
import Button from '../Button/Button';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
function UpcomingEvents() {
	const allEvents = LesMillsEvents;
	const today = new Date();
	const windowWidth = window.innerWidth;
	const eventAmount = windowWidth > 1200 ? 2 : 1;
	return (
		<div className='upcoming-events-container	upcoming-events'>
			<p className={windowWidth > 1160 ? 'fs-700' : 'fs-650'}>
				Yaklaşan Etkinlikler
			</p>
			{allEvents //eger event tıklanmadıysa yaklasan etkinlikleri gostereck
				.filter((event) => {
					const eventDate = new Date(event.date);
					return eventDate >= today;
				})
				.slice(0, eventAmount)
				.map((event) => {
					const eventDate = new Date(event.date);
					const daysLeft = Math.floor(
						(eventDate.getTime() - today.getTime()) /
							(1000 * 3600 * 24) +
							1
					);
					const eventProgram = Object.keys(lesMillsPrograms)
						.map((category) => {
							return lesMillsPrograms[category].find(
								(program) => {
									return program.id === event.program;
								}
							);
						})
						.filter(Boolean);
					return (
						<div className='border-container' key={event.id}>
							<HashLink
								smooth={true}
								to={`/programlar#${event.program}`}
							>
								<img
									className='img class-logo'
									src={eventProgram[0]?.logo}
									alt=''
								/>
							</HashLink>
							<p>
								Etkinliğimize katılmak için son {daysLeft}{' '}
								gününüz kaldı!
							</p>
							<Button>Etkinliğe Katılın</Button>
						</div>
					);
				})}
		</div>
	);
}
export default UpcomingEvents;
