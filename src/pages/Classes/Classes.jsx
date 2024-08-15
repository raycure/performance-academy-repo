import React, { useState } from 'react';
import './Classes.css';
import ClassList from '../../components/ClassList/ClassList';
function Classes() {
	const [classType, setClassType] = useState('all');
	function classSelectHandler() {}
	return (
		<>
			<img aria-label='class picture'></img>
			<nav className='class-nav-container'>
				<ul className='class-nav-list'>
					<li onClick={classSelectHandler('all')}>Tüm Programlar</li>
					<li onClick={classSelectHandler('GRUP FITNES PROGRAMLARI')}>
						Grup Fitness Programları
					</li>
					<li
						onClick={classSelectHandler(
							'YÜKSEK YOĞUNLUKLU INTERVAL PROGRAMLAR'
						)}
					>
						Yüksek Yoğunluklu Interval Programlar
					</li>
					<li
						onClick={classSelectHandler(
							'ÇOCUK VE GENÇ PROGRAMLARI'
						)}
					>
						Çocuk Programları
					</li>
				</ul>
				<ClassList classType={classType} />
			</nav>
		</>
	);
}
export default Classes;
