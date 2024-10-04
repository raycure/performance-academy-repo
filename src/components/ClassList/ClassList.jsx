import React, { useEffect, useRef, useState } from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '/ornek.jpg';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { leftToRightForClasses } from '../animations/AnimationValues.jsx';
import { accordion } from '../animations/AnimationValues.jsx';
import { createRef } from 'react';

function ClassList({ classType }) {
	const lesMillsPrograms = LesMillsPrograms();
	const [activeClass, setActiveClass] = useState(null);

	useEffect(() => {
		lineRefs.current = Object.keys(lesMillsPrograms).flatMap((category) =>
			lesMillsPrograms[category].map((_, subIndex) => {
				lineRefs.current[subIndex] ?? createRef();
			})
		);
	});
	const lineRefs = React.useRef([]);
	const windowWidth = window.innerWidth;

	function classClickHandler(id) {
		setActiveClass(id);

		// boyut degistikten sonra calisiyor cunku classclickhandler boyut degistiriyo
		requestAnimationFrame(() => {
			const element = document.getElementById(id);
			if (element) {
				const elementRect = element.getBoundingClientRect(); //uzaklık ve uzunluklari obje halinde donduruyor
				const elementTop = elementRect.top + window.scrollY; //pageYOffset deprecated scrollY kullan
				const elementHeight = element.scrollHeight;
				element.style.height = elementHeight;
				const header = document.querySelector('.nav-container'); //i guess this has to be the way cunku oburleri olmadı
				const headerHeight = header ? header.offsetHeight : 0; //0 default bulamazsa diye

				const middle =
					elementTop -
					window.innerHeight / 2 +
					elementHeight / 2 -
					headerHeight / 2;
				window.scrollTo({
					top: elementTop - headerHeight, // Subtract the header height if there is one
					behavior: 'smooth',
				});
			}
		});
	}

	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			console.log('cat', category, 'class', classType);

			return;
		}
		return lesMillsPrograms[category].map((program, subIndex) => {
			const isActive = activeClass === program.id;

			return (
				<>
					<motion.div
						ref={lineRefs.current[subIndex]}
						variants={leftToRightForClasses}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.1 }}
						custom={subIndex}
					>
						<div
							key={subIndex}
							className={`class-item-container text-container top-border-light ${
								windowWidth < 1130 && 'fs-400'
							}`}
							id={program.id}
						>
							{windowWidth > 930 && (
								<img
									aria-label='program pic'
									className='img class-img'
									src={name}
								/>
							)}
							<div>
								<img
									aria-label='logo'
									className='img class-logo'
									src={program.logo}
								/>
								<p className='slogan'>{program.sum}</p>

								<AnimatePresence>
									{isActive && (
										<motion.div
											variants={accordion}
											initial='hidden'
											animate='animate'
											exit={{
												opacity: 0,
												height: 0,
												transition: {
													duration: 0.8,
												},
											}}
										>
											{windowWidth <= 930 && windowWidth > 650 && (
												<img
													aria-label='program pic'
													className='img class-img'
													src={name}
												/>
											)}
											<p>{program.description}</p>
											{windowWidth <= 650 && (
												<img
													aria-label='program pic'
													className='img class-img'
													src={name}
												/>
											)}
											<p>{program.whyMember}</p>
											<p>{program.whyYou}</p>
											<p>Sonuçlar: {program.result}</p>
											<Link
												onClick={() => {
													setActiveClass(null);
												}}
												className='user-select-none'
											>
												Daha az göster
											</Link>
											<div className='classes-more-info-container top-border-light'>
												<div>
													<p>Egzersiz Tipi: {program.type}</p>
													<p>Ekipman: {program.equipment}</p>
													<p>Kime Yönelik: {program.for}</p>
												</div>
												<Button
													className='center-vertical'
													onClick={() => classClickHandler(program.id)}
												>
													{!isActive ? 'Daha Fazlası' : 'Programa Katılın'}
													<MdOutlineDoubleArrow color='white' />
												</Button>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
							{!isActive && (
								<div
									className={`classes-more-info-container top-border-light fs-400 ${
										windowWidth < 1130 && 'fs-300'
									}`}
									style={{ marginTop: {} }} //height alıp ona gore ver
								>
									<div>
										<p>Egzersiz Tipi: {program.type}</p>
										<p>Ekipman: {program.equipment}</p>
										<p>Kime Yönelik: {program.for}</p>
									</div>
									<Button
										classProp={'classes-btn'}
										onClick={() => classClickHandler(program.id)}
										className='center-vertical'
									>
										{!isActive ? 'Daha Fazlası' : 'Programa Katılın'}
										<MdOutlineDoubleArrow
											style={{ marginTop: 2 }}
											color='white'
										/>
									</Button>
								</div>
							)}
							<div className='background-image class-background-shape'></div>
						</div>
					</motion.div>
				</>
			);
		});
	});
	return <>{classes}</>;
}
export default ClassList;
