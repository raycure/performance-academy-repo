import React, { useEffect, useState } from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '../../assets/ornek.jpg';
import BODYPUMP from '../../assets/classLogo/BODYPUMP.png';

function ClassList({ classType }) {
	const [activeClass, setActiveClass] = useState(null);
	function classClickHandler(index) {
		setActiveClass(index);
	}
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			return;
		}
		return (
			<>
				{lesMillsPrograms[category].map((program, subIndex) => {
					const isActive = activeClass === subIndex;
					if (!program.sum) {
						return;
					}
					return (
						<div
							key={subIndex}
							className='class-item-container class-text-container top-border-light row'
							onClick={() => classClickHandler(subIndex)}
						>
							<img
								aria-label='program pic'
								className='img class-img'
								src={name}
							/>
							<div>
								<img
									aria-label='logo'
									className='img class-logo'
									src={BODYPUMP}
								/>
								<p className='slogan'>{program.sum}</p>
							</div>

							{isActive && (
								<div className='class-reason-container'>
									<p>{program.description}</p>
									<p>{program.whyMember}</p>
									<p>{program.whyYou}</p>
								</div>
							)}
							<div className='row more-button-container top-border-light'>
								<div>
									<p>Egzersiz Tipi: {program.type}</p>
									<p>Ekipman: {program.equipment}</p>
									<p>Kime Yönelik: {program.for}</p>
								</div>
								<Button>
									Daha Fazlası
									<MdOutlineDoubleArrow color='white' />
								</Button>
							</div>
						</div>
					);
				})}
			</>
		);
	});
	return <>{classes}</>;
}
export default ClassList;
