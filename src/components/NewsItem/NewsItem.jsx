import React from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

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

		if (
			eventDate > dateTwentyDaysAfter() ||
			eventDate < dateTwentyDaysAgo()
		) {
			return;
		}

		const scrollWithOffset = (el) => {
			const yCoordinate = el.getBoundingClientRect().top;
			const yOffset = -(screen.height * 0.2);
			window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
		};

		return (
			<div className='event-item-container'>
				{daysLeft > 0 && (
					<div className='event'>
						<h3>Yaklaşan Etkinlik!</h3>
						<p className='event-text'>
							{eventDate.toLocaleDateString()} tarihinde{' '}
							{event.title} programından oluşan etkinliğimiz
							yakınlaşmakta! Etkinliğimize son {daysLeft} gün!
						</p>
						<HashLink
							smooth
							to={`/programlar#${event.program}`}
							scroll={(el) => scrollWithOffset(el)}
						>
							Programı incelemek için buraya tıklayın!
						</HashLink>
					</div>
				)}
				{daysLeft <= 0 && (
					<div className='event'>
						<h3>Geçmiş Etkinlik</h3>
						<p className='event-text'>
							{eventDate.toLocaleDateString()} tarihinde{' '}
							{event.title} programından oluşan etkinliğimiz
							maalesef bitmiştir. Yakınlaşan etkinliklerimize göz
							atmayı unutmayın!
						</p>
					</div>
				)}
			</div>
		);
	});
	return <>{events}</>; //eger farklı tur arrayler olurrsa baska tur haberler icin onları mergele, sortla ve oyle yazdır
}

export default NewsItem;
