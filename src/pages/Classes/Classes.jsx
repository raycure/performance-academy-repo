import React, { useEffect, useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { motion } from 'framer-motion';
import { backgroundFill } from '../../components/animations/AnimationValues';
import { useTranslation } from 'react-i18next';
function Classes() {
	const location = useLocation();
	const { t, i18n } = useTranslation('programs');
	const [classType, setClassType] = useState(
		location.state ? location.state : 'all'
	);
	function classSelectHandler(newClassType) {
		setClassType(newClassType);
		console.log('type', classType);
	}
	const windowWidth = window.innerWidth;
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
	return (
		<div>
			<div className='page-poster-container'>
				<img
					src='/ornek.jpg'
					alt='events page hero'
					className='background-image'
				/>
				<img
					src={backgroundText}
					alt='events page hero'
					className='hero-text'
				/>
			</div>

			<ul
				className={`class-selector-bar user-select-none ${
					windowWidth <= 770 && 'fs-300'
				}`}
			>
				{programNames.map((program, index) => {
					return (
						<motion.li
							initial='initial'
							whileHover='animate'
							className='class-selector-item relative-position'
							onClick={() => classSelectHandler(program.selector)}
							key={index}
							style={
								classType === program.selector && {
									backgroundColor: 'white',
									color: 'black',
								}
							}
						>
							<motion.div
								variants={backgroundFill}
								className='class-selector-background'
								style={{
									backgroundColor: 'white',
								}}
							/>
							{program.label}
						</motion.li>
					);
				})}
			</ul>
			<ClassList classType={classType} />
		</div>
	);
}
export default Classes;
