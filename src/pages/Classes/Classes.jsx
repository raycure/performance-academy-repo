import React, { useEffect, useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { motion } from 'framer-motion';
import { backgroundFill } from '../../components/animations/AnimationValues';

function Classes() {
	const location = useLocation();
	const [classType, setClassType] = useState(
		location.state ? location.state : 'all'
	);
	function classSelectHandler(newClassType) {
		setClassType(newClassType);
	}
	const windowWidth = window.innerWidth;
	const programNames = [
		{
			label: 'Tüm Programlar',
			selector: 'all',
		},
		{
			label: 'Grup Fitness Programları',
			selector: 'GRUP FITNESS PROGRAMLARI',
		},
		{
			label: 'Çocuk ve Genç Programları',
			selector: 'ÇOCUK VE GENÇ PROGRAMLARI',
		},
		{
			label: 'Yüksek Yoğunluklu Interval Programlar',
			selector: 'YÜKSEK YOĞUNLUKLU INTERVAL PROGRAMLAR',
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
					className='events-hero-text'
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
