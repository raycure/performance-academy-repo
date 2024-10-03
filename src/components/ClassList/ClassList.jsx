import React, { useEffect, useRef, useState } from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import LesMillsPrograms from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '/ornek.jpg';
import { Link, redirect } from 'react-router-dom';
import { useCallback } from 'react';
import {
	AnimatePresence,
	m,
	motion,
	useAnimation,
	useInView,
} from 'framer-motion';
import { leftToRightForClasses } from '../animations/AnimationValues.jsx';
import { accordion } from '../animations/AnimationValues.jsx';
import { createRef } from 'react';

function ClassList({ classType }) {
	const mainControls = useAnimation();
	const windowWidth = window.innerWidth;
	const [activeClass, setActiveClass] = useState(null);
	const classClickHandler = (id) => {
		setActiveClass(id);
	};

	const scrollToTheTop = useCallback((id) => {
		setTimeout(() => {
			const divElement = document.querySelector(`#${id}`);
			const divHeight = divElement ? divElement.offsetTop : 0;
			const headerElement = document.querySelector(
				'.navigation-outer-container'
			);
			const headerHeight = headerElement.offsetHeight;
			window.scrollTo({
				behavior: 'smooth',
				top: divHeight - headerHeight,
			});
		}, 500);
	}, []);

	const handleButtonClick = (id) => {
		classClickHandler(id);
		scrollToTheTop(id);
	};

	const classes = Object.keys(LesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			console.log('cat', category, 'class', classType);

			return;
		}
		return lesMillsPrograms[category].map((program, subIndex) => {
			const isActive = activeClass === program.id;

			return (
				<>
					<motion.div
						initial='hidden'
						animate={mainControls}
						variants={leftToRightForClasses}
						whileInView='show'
						viewport={{ once: true, amount: 0.1 }}
						custom={program.id}
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
												opacity: 1,
												height: 0,
												transition: {
													duration: 0.5,
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
													onClick={() => {
														// scrollToTheTop(program.id);
														handleButtonClick(program.id);
														// classClickHandler(program.id);
													}}
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
										onClick={() => {
											handleButtonClick(program.id);
										}}
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
