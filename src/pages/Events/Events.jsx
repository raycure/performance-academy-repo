import './Events.css';
import React, { useRef, useState } from 'react';
import CalendarContainer from '../../components/CalendarContainer/CalendarContainer';
import { useEffect } from 'react';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import EventList from '../../components/EventItem/EventList';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CertificationSteps from '../../components/CertificationSteps/CertificationSteps';
import SpecialEvent from '../../components/SpecialEvent/SpecialEvent';

function Events() {
	const { t, i18n } = useTranslation('programs');
	const lesMillsPrograms = LesmillsPrograms();
	const location = useLocation();
	const today = new Date();
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
	const [onlineCheck, setOnlineCheck] = useState(undefined);
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
		setActiveClass(null);
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
			<CalendarContainer />
			{today < new Date('2025-05-12') ? <SpecialEvent /> : ''}
			<CertificationSteps />
			<section>
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
								style={{
									width: 'max-content',
								}}
							>
								{classes}
							</div>
						</div>
					</div>
					<div className='radio-group'>
						<div className='radio-option'>
							<input
								value={onlineCheck}
								type='radio'
								name='radio-option'
								className='radio-btn'
								checked={onlineCheck === true}
								onChange={() => handleOnlineSelect(true)}
							/>
							<label className='radio-label'>
								{i18n.language === 'en' ? 'Online' : 'Sanal'}
							</label>
						</div>
						<div className='radio-option'>
							<input
								value={!onlineCheck}
								type='radio'
								name='radio-option'
								className='radio-btn'
								checked={onlineCheck === false}
								onChange={() => handleOnlineSelect(false)}
							/>
							<label className='radio-label'>
								{i18n.language === 'en' ? 'In-Person' : 'Canlı'}
							</label>
						</div>
						<div className='radio-option'>
							<input
								value={onlineCheck === null || onlineCheck === undefined}
								type='radio'
								name='radio-option'
								className='radio-btn'
								checked={onlineCheck === null || onlineCheck === undefined}
								onChange={() => handleOnlineSelect(null)}
							/>
							<label className='radio-label'>
								{i18n.language === 'en' ? 'All' : 'Tümü'}
							</label>
						</div>
					</div>
				</div>
				<EventList
					key={activeClass}
					onlineCheck={onlineCheck}
					activeProgram={activeClass ? activeClass : 'all'}
					activeCategory={activeCategory}
					infoActive={true}
				/>
			</section>
		</div>
	);
}

export default Events;
