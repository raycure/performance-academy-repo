import React, { useEffect, useState } from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import { lesMillsPrograms } from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '../../assets/ornek.jpg';
import BODYPUMP from '../../assets/classLogo/BODYPUMP.png';

function ClassList({ classType }) {
	const [activeClass, setActiveClass] = useState(null);
	function classClickHandler(id) {
		setActiveClass(id);

		// boyut degistikten sonra calisiyor cunku classclickhandler boyut degistiriyo
		requestAnimationFrame(() => {
			const element = document.getElementById(id);
			if (element) {
				//burda hesapliyor
				const elementRect = element.getBoundingClientRect(); //uzaklık ve uzunluklari obje halinde donduruyor
				const elementTop = elementRect.top + window.scrollY; //pageYOffset deprecated scrollY kullan
				const elementHeight = elementRect.height;
				const header = document.querySelector('.nav-container'); //i guess this has to be the way cunku oburleri olmadı
				const headerHeight = header ? header.offsetHeight : 0; //0 default bulamazsa diye
				const middle =
					elementTop -
					window.innerHeight / 2 +
					elementHeight / 2 -
					headerHeight / 2;
				window.scrollTo({
					top: middle,
					behavior: 'smooth',
				});
			}
		});
	}
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			return;
		}

		return (
			<>
				{lesMillsPrograms[category].map((program, subIndex) => {
					const isActive = activeClass === program.id;
					return (
						<div
							key={subIndex}
							className='class-item-container class-text-container top-border-light row'
							onClick={() => classClickHandler(program.id)}
							id={program.id}
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

								{isActive && (
									<>
										<p>{program.description}</p>
										<p>{program.whyMember}</p>
										<p>{program.whyYou}</p>
									</>
								)}
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
							<div
								className='class-background-shape'
								style={{ backgroundColor: program.color }}
							></div>
						</div>
					);
				})}
			</>
		);
	});
	return <>{classes}</>;
}
export default ClassList;
