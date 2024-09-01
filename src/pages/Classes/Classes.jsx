import React, { useEffect, useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
import { useLocation } from 'react-router-dom';
import backgroundText from '../../assets/CHOOSE-HAPPY.png';
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

			<ul
				className={`class-selector-bar ${
					windowWidth <= 770 && 'fs-300'
				}`}
			>
				<li
					className='class-selector-item'
					onClick={() => classSelectHandler('all')}
				>
					Tüm Programlar
				</li>
				<li
					className='class-selector-item'
					onClick={() =>
						classSelectHandler('GRUP FITNESS PROGRAMLARI')
					}
				>
					Grup Fitness Programları
				</li>
				<li
					className='class-selector-item'
					onClick={() =>
						classSelectHandler('ÇOCUK VE GENÇ PROGRAMLARI')
					}
				>
					Çocuk ve Genç Programları
				</li>
				<li
					className='class-selector-item'
					onClick={() =>
						classSelectHandler(
							'YÜKSEK YOĞUNLUKLU INTERVAL PROGRAMLAR'
						)
					}
				>
					Yüksek Yoğunluklu Interval Programlar
				</li>
			</ul>
			<ClassList classType={classType} />
		</div>
	);
}
export default Classes;
