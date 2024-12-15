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
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/authStateSlice';
import { AuthService } from '../../auth/auth.service';
import { useDispatch } from 'react-redux';
function EventList({ activeProgram, infoActive, onlineCheck }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let isLoggedIn = useSelector(selectIsLoggedIn);

	async function Payment(e) {
		e.preventDefault();
		if (!isLoggedIn) {
			// todo give a notif that they need to login first
			navigate('/login');
		}
		const response = await dispatch(
			AuthService({
				data: { id: selectedEvent.id },
				method: 'POST',
				endpoint: '/pay',
			})
		);
		const paymentUrl = response.payload.data.url;
		if (paymentUrl) {
			window.location = paymentUrl;
		}
	}

	const today = new Date();

	const eventFallback = LesMillsEvents.filter((event) => {
		if (activeProgram === 'all') {
			return event.fullStartDate >= today;
		}
		return event.program === activeProgram && event.fullStartDate >= today;
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
		if (
			activeProgram === 'all' ||
			activeProgram === null ||
			activeProgram === undefined
		) {
			if (onlineCheck === true) {
				return event.fullStartDate >= today && event.online === true;
			} else if (onlineCheck === false) {
				return event.fullStartDate >= today && event.online === false;
			}
			return event.fullStartDate >= today;
		}
		if (onlineCheck === true) {
			return (
				event.program === activeProgram &&
				event.fullStartDate >= today &&
				event.online === true
			);
		} else if (onlineCheck === false) {
			return (
				event.program === activeProgram &&
				event.fullStartDate >= today &&
				event.online === false
			);
		}
		return event.program === activeProgram && event.fullStartDate >= today;
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
			'https://maps.google.com?q=' +
				selectedEvent.location[0] +
				',' +
				selectedEvent.location[1],
			'_blank',
			'noreferrer'
		); //biri latitude biri longtitude ama unuttum hangisi hangisi
	};
	const programs = Object.values(LesmillsPrograms()).flat();

	function prePage() {
		if (paginationPageNumber !== 1) {
			setPaginationPageNumber(paginationPageNumber - 1);
		}
	}

	function nextPage() {
		if (paginationPageNumber !== pageAmount) {
			setPaginationPageNumber(paginationPageNumber + 1);
		}
	}

	function changePageNumber(id) {
		setPaginationPageNumber(id);
	}
	function handleEventSelection(selected) {
		setSelectedEvent(selected);
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
	}

	let calendarSelectId = useSelector(
		(state) => state.calendarSelectedEventId.id
	);
	useEffect(() => {
		const calendarSelectedEvent = LesMillsEvents.find((event) => {
			return event.id === calendarSelectId;
		});
		if (!calendarSelectedEvent) {
			return;
		}
		setSelectedEvent(calendarSelectedEvent);
	}, [calendarSelectId]);
	useEffect(() => {
		if (selectedEvent === null || selectedEvent === undefined) {
			setSelectedEvent(eventFallback);
		}
	}, [selectedEvent]);
	const daysLeft = Math.floor(
		(selectedEvent.fullStartDate.getTime() - today.getTime()) /
			(1000 * 3600 * 24)
	);
	const programImg = programs.filter((program) => {
		return program.id === selectedEvent.program;
	})[0].additionalPictures[2].url;
	if (paginatedEvents === null || paginatedEvents === undefined) {
		return (
			<p style={{ textAlign: 'center', padding: '4rem' }}>
				{i18n.language === 'en'
					? 'Unfortunately theres no event for this program yet.'
					: 'Üzgünüz yakın zaman içerisinde bu program için bir etkinlik yok.'}
			</p>
		);
	}
	if (eventItems.length === 0) {
		return (
			<p style={{ textAlign: 'center', padding: '4rem' }}>
				{i18n.language === 'en'
					? 'Unfortunately theres no event fitting the criteria you picked.'
					: 'Üzgünüz seçtiğiniz özelliklere uygun bir etkinlik yok.'}
			</p>
		);
	}
	return (
		<div className='event-list-grid'>
			<div className='event-list'>
				<div>
					{paginatedEvents.map((event, index) => {
						const programTitle = programs.filter((program) => {
							return program.id === event.program;
						})[0].title;
						return (
							<div className='enroll-event-item' key={index}>
								<p
									className='event-list-title'
									style={{ alignContent: 'center', minWidth: '8rem' }}
								>
									{programTitle}
								</p>

								<p style={{ alignContent: 'center' }}>
									{event.fullStartDate.getDate() +
										' ' +
										event.fullStartDate.toLocaleString(i18n.language, {
											month: 'short',
										}) +
										' - ' +
										event.fullEndDate.getDate() +
										' ' +
										event.fullEndDate.toLocaleString(i18n.language, {
											month: 'short',
										})}
								</p>
								<p
									className='event-list-online'
									style={{ alignContent: 'center' }}
								>
									{event.online
										? i18n.language === 'en'
											? 'Online'
											: 'Çevrim İçi'
										: i18n.language === 'en'
										? 'In Person'
										: 'Yüz Yüze'}
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
											{i18n.language === 'en' ? 'View' : 'İncele'}
										</Link>
										<Button onClick={() => handleEventSelection(event)}>
											{i18n.language === 'en' ? 'Select' : 'Seç'}
										</Button>
									</div>
								) : (
									<Button onClick={() => handleEventSelection(event)}>
										{i18n.language === 'en' ? 'Select' : 'Seç'}
									</Button>
								)}
							</div>
						);
					})}
				</div>
				<div
					id='eventInfoPagination'
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						margin: '0.6rem',
						width: '100%',
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
			<form className='bg-primary-300 event-list-card' id='event-select-form'>
				<p className='fs-300 text-primary-200'>
					{i18n.language === 'en' ? 'Event Details' : 'Etkinlik Bilgileri'}
				</p>
				<p style={{ textAlign: 'center' }} className='fs-700'>
					{selectedEvent.program}
				</p>
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
							selectedEvent.fullEndDate.getDate() +
							' ' +
							selectedEvent.fullEndDate.toLocaleString(i18n.language, {
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
						<FaRegUser />{' '}
						{i18n.language === 'en'
							? `With ${selectedEvent.instructor}!`
							: `${selectedEvent.instructor} İle!`}
					</p>
				)}
				<p className='card-item'>
					<TbWorld />
					{selectedEvent.online
						? i18n.language === 'en'
							? 'Online Lessons'
							: 'Çevrim İçi Dersler'
						: i18n.language === 'en'
						? 'In Person Lessons'
						: 'Yüz Yüze Dersler'}
				</p>
				{selectedEvent.location && (
					<p className='card-item'>
						<FiMapPin />
						<Link
							style={{ textDecoration: 'underline' }}
							onClick={() => locationClickHandler()}
						>
							{i18n.language === 'en' ? 'See on Map' : 'Haritada Görüntüleyin'}
						</Link>
					</p>
				)}
				<p className='card-item'>
					<FaMoneyCheck /> {i18n.language === 'en' ? 'Only' : 'Sadece'} $
					{daysLeft <= 28 ? 300 : 350}!
					{/* 4 hafta içinde mi diye checkleyip ona göre fiyat */}
				</p>
				<div
					style={{
						justifyContent: 'end',
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						gap: '1rem',
						marginBottom: '1.5rem',
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
							{i18n.language === 'en'
								? ' I agree to the terms and conditions and the privacy policy'
								: ' Kullanım koşulları ve gizlilik politikasını kabul ediyorum.'}
						</label>
					</div>
					<Button
						// disabled={!acknowledgementChecked ? true : false}
						// todo add contract verification
						styleProp={{ marginInline: 'auto' }}
						onClick={(e) => Payment(e)}
					>
						{i18n.language === 'en' ? 'Attend Event!' : 'Etkinliğe Katıl!'}
					</Button>
				</div>
			</form>

			<img
				style={{
					objectFit: 'cover',
					minHeight: '80%',
					alignSelf: 'center',
				}}
				src={programImg}
			/>
		</div>
	);
}
export default EventList;
