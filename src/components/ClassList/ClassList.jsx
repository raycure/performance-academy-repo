import React from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import name from '/ornek.jpg';
import { motion } from 'framer-motion';
import { leftToRightForClasses } from '../animations/AnimationValues.jsx';
import { useTranslation } from 'react-i18next';

function ClassList({ classType }) {
	const lesMillsPrograms = LesmillsPrograms();
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		const { t, i18n } = useTranslation();
		if (category !== classType && classType !== 'all') {
			return;
		}
		return lesMillsPrograms[category].map((program, subIndex) => {
			return (
				<>
					<motion.div
						variants={leftToRightForClasses}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true, amount: 0.1 }}
						custom={subIndex}
					>
						<div
							key={subIndex}
							className='class-item-container text-container top-border-light'
							id={program.id}
						>
							<img
								aria-label='program pic'
								className='img class-img'
								src={name}
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									padding: '1rem 0',
								}}
							>
								<div>
									<img
										aria-label='logo'
										className='img class-logo'
										src={program.logo}
									/>
									<p className='slogan'>{program.sum}</p>
									<p>
										{i18n.language === 'tr' ? 'Dersler' : 'Lessons'}:{' '}
										{program.lessons}
									</p>
								</div>
								<div
									className='classes-more-info-container top-border-light fs-400 '
									style={{ marginTop: {} }} //todo height alıp ona gore ver
								>
									<div>
										<p>
											{i18n.language === 'tr' ? 'Türü' : 'Type'}: {program.type}
										</p>
										<p>
											{i18n.language === 'tr' ? 'Ekipman' : 'Equipment'}:{' '}
											{program.equipment}
										</p>
										<p>
											{i18n.language === 'tr' ? 'Kime Yönelik' : 'For'}:{' '}
											{program.for}
										</p>
									</div>
									<Button
										classProp={'classes-btn'}
										redirect={'/program'}
										navProp={{ program: program.id }}
										className='center-vertical'
									>
										İncele
										<MdOutlineDoubleArrow
											style={{ marginTop: 2 }}
											color='white'
										/>
									</Button>
								</div>
							</div>

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
