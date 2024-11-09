import React, { useEffect, useState } from 'react';
import { LesMillsEvents } from '../../assets/LesmillsEvents';
import './EventList.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaRegClock } from 'react-icons/fa6';
import { FiMapPin } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { FaMoneyCheck } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { GrDocumentPdf } from 'react-icons/gr';
import { GrDocumentUpdate } from 'react-icons/gr';

function EventList({ activeProgram, programTitle, infoActive }) {
	const today = new Date();
	const eventFallback = LesMillsEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return event.program === activeProgram && eventDate >= today;
	}).slice(0, 1)[0];
	const [acknowledgementChecked, setAcknowledgementChecked] = useState(false);
	const checkHandler = () => {
		setAcknowledgementChecked(!acknowledgementChecked);
	};
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
	const [fileName, setFileName] = useState(null);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setFileName(file ? file.name : null);
	};
	const locationClickHandler = () => {
		window.open(
			'https://maps.google.com?q=' +
				selectedEvent.location[0] +
				',' +
				selectedEvent.location[1],
			'_blank',
			'noreferrer'
		); //biri latitude biri longtitude ama unuttum hangisi hangisi
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
	if (selectedEvent === null || selectedEvent === undefined) {
		return <p>Unfortunately theres no event for this program yet.</p>;
	}
	return (
		<section className='event-list-grid'>
			<div className='event-list'>
				{paginatedEvents.map((event, index) => {
					return (
						<section className='enroll-event-item' key={index}>
							<p className='display-none' style={{ alignContent: 'center' }}>
								{programTitle}
							</p>

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
										Seç
									</Button>
								</div>
							) : (
								<Button onClick={() => handleEventSelection(event)}>Seç</Button>
							)}
						</section>
					);
				})}
				<div
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
				</div>
			</div>
			<form className='bg-primary-300 event-list-card'>
				<p className='fs-300 text-primary-200'>Etkinlik Bilgileri</p>
				<p className='fs-700'>{selectedEvent.program}</p>
				<hr style={{ borderWidth: '2px', marginBottom: '1rem' }} />
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
					<p className='card-item'>
						<FaCalendarDays />
						{' ' +
							selectedEvent.fullStartDate.getDate() +
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
					{selectedEvent.time && (
						<p className='card-item'>
							<FaRegClock /> {selectedEvent.time}
						</p>
					)}
				</div>
				{selectedEvent.instructor && (
					<p className='card-item'>
						<FaRegUser /> {selectedEvent.instructor} İle!
					</p>
				)}
				<p className='card-item'>
					<TbWorld />
					{selectedEvent.online ? 'Çevrim İçi ' : 'Yüz Yüze '}
					Dersler
				</p>
				{selectedEvent.location && (
					<p className='card-item'>
						<FiMapPin />
						<Link
							style={{ textDecoration: 'underline' }}
							onClick={() => locationClickHandler()}
						>
							{' ' + selectedEvent.location}
						</Link>
					</p>
				)}
				<p className='card-item'>
					<FaMoneyCheck /> Only ${selectedEvent.price}!
				</p>
				<div
					className='center-item'
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginTop: 'auto',
					}}
				>
					<Link style={{ textDecoration: 'underline' }}>
						Eğitmen Sözleşmesi İçin Tıklayınız{' '}
						<GrDocumentPdf
							style={{
								display: 'inline-block',
								position: 'relative',
								top: '2px',
							}}
						/>
					</Link>

					<p className='fs-400 text-primary-100'>
						Doldurduğunuz sözleşmeyi buraya yükleyiniz:
					</p>
					<input
						type='file'
						name='file'
						id='file'
						class='inputfile'
						onChange={handleFileChange}
						required
					/>
					<label htmlFor='file'>
						<p>
							<GrDocumentUpdate
								style={{
									display: 'inline-block',
									marginRight: '0.5rem',
									position: 'relative',
									top: '2px',
								}}
							/>
							{fileName === null ? 'Choose a File...' : fileName}
						</p>
					</label>
				</div>
				<div
					style={{
						justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<div>
						<input
							type='checkbox'
							id='acknowledgeCheckbox'
							name='acknowledgeCheckbox'
							checked={acknowledgementChecked}
							onChange={checkHandler}
							required
						/>
						<label
							className='fs-300 text-primary-200'
							htmlFor='acknowledgeCheckbox'
						>
							{' '}
							I agree to the terms and conditions and the privacy policy
						</label>
					</div>
					<Button
						disabled={
							fileName === null || !acknowledgementChecked ? true : false
						}
					>
						Etkinliğe Katıl!
					</Button>
				</div>
			</form>

			<img
				style={{
					objectFit: 'cover',
					minHeight: '80%',
					alignSelf: 'center',
				}}
				src='/ornek.jpg'
			/>
		</section>
	);
}
export default EventList;
