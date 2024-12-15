import './Events.css';
import React, { useRef, useState } from 'react';
import Container from '../../components/Containers/Container';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import { useEffect } from 'react';

import LesmillsPrograms from '../../assets/LesmillsPrograms';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import EventList from '../../components/EventItem/EventList';
import test from '../../assets/test.png';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CertificationSteps from '../../components/CertificationSteps/CertificationSteps';

function Events() {
	const { t, i18n } = useTranslation('programs');
	const lesMillsPrograms = LesmillsPrograms();
	const location = useLocation();
	const programNames = [
		{
			label: t('cat4'),
			selector: 'all',
		},
		{
			label: t('cat1.title'),
			selector: t('cat1.title'),
		},
		{
			label: t('cat2.title'),
			selector: t('cat2.title'),
		},
		{
			label: t('cat3.title'),
			selector: t('cat3.title'),
		},
	];

	const [activeCategory, setActiveCategory] = useState(null);
	const [activeClass, setActiveClass] = useState(null);

	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

	const [onlineCheck, setOnlineCheck] = useState(undefined);
	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile && selectedFile.type !== 'application/pdf') {
			setMessage(
				i18n.language === 'en'
					? 'Please select a PDF file.'
					: 'Lütfen bir PDF dosyası seçiniz.'
			);
			setFile(null);
		} else {
			setMessage('');
			setFile(selectedFile);
		}
	};

	const handleUpload = async (event) => {
		event.preventDefault();
		if (!file) {
			setMessage(
				i18n.language === 'en'
					? 'Please select a PDF file.'
					: 'Lütfen bir PDF dosyası seçiniz.'
			);
			return;
		}
		const formData = new FormData();
		formData.append('file', file);
		setMessage('');

		try {
			const response = await axios.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setMessage(
				i18n.language === 'en'
					? 'File uploaded successfully!'
					: 'Dosya başarıyla yüklendi.'
			);
		} catch (error) {
			setMessage(
				i18n.language === 'en'
					? 'Error uploading file'
					: 'Dosya yüklenirken bir sorun oluştu'
			);
			console.error('Error:', error);
		} finally {
		}
	};
	const [isCatMenuOpen, setIsCatMenuOpen] = useState(false);
	const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);

	const toggleCategoryDropdown = () => {
		setIsCatMenuOpen(!isCatMenuOpen);
	};
	const toggleClassDropdown = () => {
		setIsClassMenuOpen(!isClassMenuOpen);
	};
	const handleCategorySelect = (cat) => {
		if (cat === 'all') {
			setActiveClass('all');
		}
		setActiveCategory(cat);
		toggleCategoryDropdown();
	};
	const handleOnlineSelect = (value) => {
		setOnlineCheck(value);
	};
	// to close menus when its clicked outside
	const catMenuRef = useRef(null);
	const classMenuRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (catMenuRef.current && !catMenuRef.current.contains(event.target)) {
				setIsCatMenuOpen(false);
			}
			if (
				classMenuRef.current &&
				!classMenuRef.current.contains(event.target)
			) {
				setIsClassMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [catMenuRef, classMenuRef]);

	useEffect(() => {
		if (location.state?.scrollToElement) {
			const element = document.getElementById(location.state?.elementId);
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
	}, [location]);
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== activeCategory || activeCategory === 'all') return null;
		return lesMillsPrograms[category].map((classTitle, index) => {
			return (
				<div
					className='dropDownCategoryItem'
					key={index}
					style={
						activeClass === classTitle.id ? { backgroundColor: 'gray' } : {}
					}
					onClick={() => setActiveClass(classTitle.id)}
				>
					{classTitle.title}
				</div>
			);
		});
	});

	return (
		<div id='event-page'>
			<div className='page-poster-container '>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<img
					src={backgroundText}
					alt='events page hero'
					style={{ position: 'relative', alignSelf: 'center', height: '50%' }}
				/>
			</div>

			<CalendarContainer />

			<CertificationSteps />
			<h2 className='fs-650 center-item' style={{ padding: '2rem' }}>
				{i18n.language === 'en' ? 'CHOOSE AN EVENT' : 'ETKİNLİKLERİMİZ'}
			</h2>

			<div className='classPick'>
				<div className='dropDownMenus'>
					<div className='dropDownCategoryMenu'>
						<button
							className='dropDownCategoriesButton'
							onClick={toggleCategoryDropdown}
							onMouseEnter={() => setIsCatMenuOpen(true)}
						>
							{i18n.language === 'en' ? 'Categories' : 'Kategoriler'}
						</button>
						<div
							className={`dropDownCategories ${
								isCatMenuOpen && 'dropDownCategoriesActive'
							}`}
							ref={catMenuRef}
							onMouseLeave={() => setIsCatMenuOpen(false)}
						>
							{programNames.map((program, index) => (
								<div
									key={index}
									className='dropDownCategoryItem'
									onClick={() => {
										handleCategorySelect(program.selector);
									}}
									style={
										activeCategory === program.selector
											? { backgroundColor: 'gray' }
											: {}
									}
								>
									{program.label}
								</div>
							))}
						</div>
					</div>
					<div className='dropDownCategoryMenu'>
						<button
							className='dropDownCategoriesButton'
							onClick={
								activeCategory && activeCategory !== 'all'
									? toggleClassDropdown
									: null
							}
							onMouseEnter={
								activeCategory && activeCategory !== 'all'
									? () => setIsClassMenuOpen(true)
									: null
							}
							style={{
								color:
									!activeCategory || activeCategory === 'all'
										? '#6e6e73'
										: 'white',
							}}
						>
							{i18n.language === 'en' ? 'Programs' : 'Programlar'}
						</button>

						<div
							onMouseLeave={() => setIsClassMenuOpen(false)}
							ref={classMenuRef}
							className={`dropDownCategories ${
								isClassMenuOpen && 'dropDownCategoriesActive'
							}`}
							style={{ color: 'black' }}
						>
							{classes}
						</div>
					</div>
				</div>
				<div class='radio-group'>
					<div class='radio-option'>
						<input
							value={onlineCheck}
							type='radio'
							name='radio-option'
							class='radio-btn'
							checked={onlineCheck === true}
							onChange={() => handleOnlineSelect(true)}
						/>
						<label class='radio-label'>
							{i18n.language === 'en' ? 'Online' : 'Sanal'}
						</label>
					</div>
					<div class='radio-option'>
						<input
							value={!onlineCheck}
							type='radio'
							name='radio-option'
							class='radio-btn'
							checked={onlineCheck === false}
							onChange={() => handleOnlineSelect(false)}
						/>
						<label class='radio-label'>
							{i18n.language === 'en' ? 'In-Person' : 'Canlı'}
						</label>
					</div>
					<div class='radio-option'>
						<input
							value={onlineCheck === null || onlineCheck === undefined}
							type='radio'
							name='radio-option'
							class='radio-btn'
							checked={onlineCheck === null || onlineCheck === undefined}
							onChange={() => handleOnlineSelect(null)}
						/>
						<label class='radio-label'>
							{i18n.language === 'en' ? 'All' : 'Hepsi'}
						</label>
					</div>
				</div>
			</div>

			<EventList
				key={activeClass}
				onlineCheck={onlineCheck}
				activeProgram={activeClass ? activeClass : 'all'}
				infoActive={true}
			/>

			{/* <PaginationContainer /> */}
			<form onSubmit={handleUpload}>
				<input
					type='file'
					onChange={handleFileChange}
					accept='application/pdf'
				/>
				<button type='submit'>submit</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default Events;
