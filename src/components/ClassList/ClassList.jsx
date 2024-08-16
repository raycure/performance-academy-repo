import React, { useEffect } from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '../../assets/ornek.jpg';
import BODYPUMP from '../../assets/classLogo/BODYPUMP.png';

function ClassList({ classType }) {
	//useEffect(() => {}, []);
	//function classClickHandler() {}
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			return;
		}
		return (
			<>
				{lesMillsPrograms[category].map((program, subIndex) => {
					return (
						<div
							className='class-item-container class-text-container top-border-light row'
							//onClick={classClickHandler}
						>
							<img
								aria-label='program pic'
								className='img class-img'
								src={name}
							/>
							<div className='info-container'>
								<div>
									<img
										aria-label='logo'
										className='img class-logo'
										src={BODYPUMP}
									/>
									<p className='slogan'>{program.sum}</p>
								</div>
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
						</div>
					);
				})}
			</>
		);
	});
	return <>{classes}</>;
}
export default ClassList;
