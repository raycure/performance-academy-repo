import React, { useEffect, useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
import { motion } from 'framer-motion';
import { squeeze } from '../animations/AnimationValues';

function Classes() {
	const location = useLocation();
	const [classType, setClassType] = useState(
		location.state ? location.state : 'all'
	);
	function classSelectHandler(newClassType) {
		setClassType(newClassType);
	}
	const windowWidth = window.innerWidth;
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

			<ul className={`class-selector-bar ${windowWidth <= 770 && 'fs-300'}`}>
				<motion.li
					varients={squeeze}
					initial='initial'
					whileHover='animate'
					className='class-selector-item'
					onClick={() => classSelectHandler('all')}
				>
					Tüm Programlar
				</motion.li>
				<motion.li
					varients={squeeze}
					initial='initial'
					whileHover='animate'
					className='class-selector-item'
					onClick={() => classSelectHandler('GRUP FITNESS PROGRAMLARI')}
				>
					Grup Fitness Programları
				</motion.li>
				<motion.li
					varients={squeeze}
					initial='initial'
					whileHover='animate'
					className='class-selector-item'
					onClick={() => classSelectHandler('ÇOCUK VE GENÇ PROGRAMLARI')}
				>
					Çocuk ve Genç Programları
				</motion.li>
				<motion.li
					varients={squeeze}
					initial='initial'
					whileHover='animate'
					className='class-selector-item'
					onClick={() =>
						classSelectHandler('YÜKSEK YOĞUNLUKLU INTERVAL PROGRAMLAR')
					}
				>
					Yüksek Yoğunluklu Interval Programlar
				</motion.li>
			</ul>
			<ClassList classType={classType} />
		</div>
	);
}
export default Classes;
