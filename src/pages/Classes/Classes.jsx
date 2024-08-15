import React, { useState } from 'react';
import './Classes.css';
import ClassList from '../../components/Classes/ClassList';
function Classes() {
	const [classType, setClassType] = useState('allClasses');
	function classSelectHandler() {}
	return (
		<>
			<img aria-label='class picture'></img>
			<nav className='class-nav-container'>
				<ul className='class-nav-list'>
					<li onClick={classSelectHandler}>Tüm Programlar</li>
					<li onClick={classSelectHandler}>Grup Fitness Programları</li>
					<li onClick={classSelectHandler}>
						Yüksek Yoğunluklu Interval Programlar
					</li>
					<li onClick={classSelectHandler}>Çocuk Programları</li>
				</ul>
				<ClassList classType={classType} />
			</nav>
		</>
	);
}
export default Classes;
