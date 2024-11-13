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
import PaginationContainer from '../../components/Containers/PaginationContainer';

function Events() {
	const { t, i18n } = useTranslation('programs');
	const lesMillsPrograms = LesmillsPrograms();
	const programID = 'BODYSTEP';

	const programNames = [
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

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];

		if (selectedFile && selectedFile.type !== 'application/pdf') {
			setMessage('Please select a PDF file.');
			setFile(null);
		} else {
			setMessage('');
			setFile(selectedFile);
		}
	};

	const handleUpload = async (event) => {
		event.preventDefault();
		if (!file) {
			setMessage('Please select a PDF file to upload');
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

			setMessage('File uploaded successfully!');
		} catch (error) {
			setMessage('Error uploading file');
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

	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== activeCategory) return null;
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
		<>
			<h2 className='fs-650 center-item'>choose a class</h2>

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
			<Container>
				<div className='classPick'>
					<div className='dropDownMenus'>
						<div className='dropDownCategoryMenu'>
							<button
								className='dropDownCategoriesButton'
								onClick={toggleCategoryDropdown}
								onMouseEnter={() => setIsCatMenuOpen(true)}
							>
								Categories
							</button>
							<div
								className={`dropDownCategories ${
									isCatMenuOpen ? 'dropDownCategoriesActive' : ''
								}`}
								ref={catMenuRef}
								onMouseLeave={() => setIsCatMenuOpen(false)}
							>
								{programNames.map((program, index) => (
									<div
										key={index}
										className='dropDownCategoryItem'
										onClick={() => {
											setActiveCategory(program.selector);
											toggleCategoryDropdown();
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
								onClick={activeCategory ? toggleClassDropdown : null}
								onMouseEnter={
									activeCategory ? () => setIsClassMenuOpen(true) : null
								}
								style={{ color: !activeCategory ? '#6e6e73' : 'white' }}
							>
								Classes
							</button>

							<div
								onMouseLeave={() => setIsClassMenuOpen(false)}
								ref={classMenuRef}
								className={`dropDownCategories ${
									isClassMenuOpen ? 'dropDownCategoriesActive' : ''
								}`}
								style={{ color: 'black' }}
							>
								{classes}
							</div>
						</div>
					</div>
					<div class='radio-group'>
						<div class='radio-option'>
							<input type='radio' name='radio-option' class='radio-btn' />
							<label class='radio-label'>online</label>
						</div>
						<div class='radio-option'>
							<input type='radio' name='radio-option' class='radio-btn' />
							<label class='radio-label'>in-person</label>
						</div>
					</div>
				</div>
			</Container>

			<EventList
				key={activeClass}
				activeProgram={activeClass ? activeClass : programID}
				// todo decide what to show if there havent been a selection
				infoActive={false}
			/>

			{/* <PaginationContainer /> */}
			<a href={test} download='test'>
				test
			</a>
			<form onSubmit={handleUpload}>
				<input
					type='file'
					onChange={handleFileChange}
					accept='application/pdf'
				/>
				<button type='submit'>submit</button>
			</form>
			{message && <p>{message}</p>}
		</>
	);
}

export default Events;
