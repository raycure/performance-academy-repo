import React, { useEffect, useState } from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import './EventList.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

function EventList({ activeProgram, programTitle, infoActive }) {
	const today = new Date();
	const eventFallback = LesMillsEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return event.program === activeProgram && eventDate >= today;
	}).slice(0, 1)[0];

	const { t, i18n } = useTranslation();
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
	const eventItems = LesMillsEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return event.program === activeProgram && eventDate >= today;
	});
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const eventsPerPage = 6;
	const lastIndex = paginationPageNumber * eventsPerPage;
	const firstIndex = lastIndex - eventsPerPage;
	const paginatedEvents = eventItems.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(eventItems.length / eventsPerPage);
	const paginationNumbers = [...Array(pageAmount + 1).keys()].slice(1);
	const [selectedEvent, setSelectedEvent] = useState(eventFallback);
	const locationClickHandler = () => {
		window.open(
			'https://maps.google.com?q=' + selectedEvent.lat + ',' + selectedEvent.lng
		);
	};
	function prePage() {
		if (paginationPageNumber !== 1) {
			setPaginationPageNumber(paginationPageNumber - 1);
		}
		//executeScroll();
	}

	function nextPage() {
		if (paginationPageNumber !== pageAmount) {
			setPaginationPageNumber(paginationPageNumber + 1);
		}
		//executeScroll();
	}

	function changePageNumber(id) {
		setPaginationPageNumber(id);
		//executeScroll();
	}
	function handleEventSelection(selected) {
		setSelectedEvent(selected);
	}

	return (
		<div className='event-list-grid'>
			<section>
				{paginatedEvents.map((event, index) => {
					return (
						<section className='enroll-event-item' key={index}>
							<p style={{ alignContent: 'center' }}>{programTitle}</p>
							<p style={{ alignContent: 'center' }}>
								{event.fullStartDate.getDate() +
									' ' +
									event.fullStartDate.toLocaleString(i18n.language, {
										month: 'short',
									}) +
									' - ' +
									event.fullStartDate.getDate() +
									' ' +
									event.fullStartDate.toLocaleString(i18n.language, {
										month: 'short',
									})}
							</p>
							{infoActive && (
								<p style={{ alignContent: 'center' }}>{event.price}$</p>
							)}
							<p style={{ alignContent: 'center' }}>
								{event.online ? 'Çevrim İçi' : 'Yüz Yüze'}
							</p>
							{infoActive ? (
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
											height: 'fit-content',
										}}
										className='addLineAnimation'
									>
										Programı İncele
									</Link>
									<Button onClick={() => handleEventSelection(event)}>
										Etkinliği Seç
									</Button>
								</div>
							) : (
								<Button onClick={() => handleEventSelection(event)}>
									Etkinliği Seç
								</Button>
							)}
						</section>
					);
				})}
				<section
					id='eventInfoPagination'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						margin: '0.6rem auto',
					}}
				>
					<button
						className={`event-pagination-item ${
							paginationPageNumber === 1 && 'display-hidden'
						}`}
						onClick={prePage}
					>
						<MdArrowBackIosNew />
					</button>
					<div className=''>
						{paginationNumbers.map((number, index) => (
							<button
								onClick={() => changePageNumber(number)}
								className={`event-pagination-item ${
									paginationPageNumber === number ? 'active' : 'inactive'
								}`}
								key={index}
							>
								{number}
							</button>
						))}
					</div>
					<button
						className={`event-pagination-item ${
							paginationPageNumber === pageAmount && 'display-hidden'
						}`}
						onClick={nextPage}
					>
						<MdArrowForwardIos />
					</button>
				</section>
			</section>
			<section className='bg-primary-300 event-list-card'>
				<p>{selectedEvent.program}</p>
				<p>
					{selectedEvent.fullStartDate.getDate() +
						' ' +
						selectedEvent.fullStartDate.toLocaleString(i18n.language, {
							month: 'short',
						}) +
						' - ' +
						selectedEvent.fullStartDate.getDate() +
						' ' +
						selectedEvent.fullStartDate.toLocaleString(i18n.language, {
							month: 'short',
						})}
				</p>
				{selectedEvent.location && (
					<Link onClick={() => locationClickHandler()}>
						{selectedEvent.location}
					</Link>
				)}
				{selectedEvent.time && <p>{selectedEvent.time}</p>}
				<p>
					<b style={{ fontWeight: 'bolder' }}>Fiyat:</b> ${selectedEvent.price}
				</p>
				<Button>Etkinliğe Katıl!</Button>
			</section>
		</div>
	);
}
export default EventList;
