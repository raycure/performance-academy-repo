import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
function NewsItem() {
	const events = LesMillsEvents.map((event) => {
		const today = new Date();
		const dateTwentyDaysAfter = () => {
			return new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate() + 20
			);
		};
		const dateTwentyDaysAgo = () => {
			return new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate() - 20
			);
		};
		const eventDate = new Date(event.date);
		const daysLeft = Math.floor(
			(eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
		);
		console.log(dateTwentyDaysAfter(), dateTwentyDaysAgo(), eventDate);

		if (
			eventDate > dateTwentyDaysAfter() ||
			eventDate < dateTwentyDaysAgo()
		) {
			return;
		}
		return (
			<div className='event-item-container'>
				<p className='event-title'>{event.title}</p>
				<p className='event-text'>
					{eventDate.toLocaleDateString()} tarihinde {event.title}{' '}
					programından oluşan etkinliğimiz yakınlaşmakta!
					Etkinliğimize son {daysLeft}
				</p>
			</div>
		);
	});
	return <>{events}</>;
}

export default NewsItem;
