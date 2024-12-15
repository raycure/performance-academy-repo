import React from 'react';
import './ClassList.css';
import Button from '../Button/Button';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { motion } from 'framer-motion';
import { leftToRightForClasses } from '../animations/AnimationValues.jsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setId } from '../../redux/Slices/ProgramIdSlice.js';
import { useNavigate } from 'react-router-dom';
function ClassList({ classType }) {
	const lesMillsPrograms = LesmillsPrograms();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSelectId = (id) => {
		dispatch(setId(id));
		navigate('/program');
	};

	const { t, i18n } = useTranslation();
	const classes = Object.keys(lesMillsPrograms).map((category) => {
		if (category !== classType && classType !== 'all') {
			return;
		}
		return lesMillsPrograms[category].map((program, subIndex) => {
			return (
				<motion.div
					variants={leftToRightForClasses}
					initial='hidden'
					whileInView='show'
					viewport={{ once: true, amount: 0.1 }}
					custom={subIndex}
					key={program.id}
					className='class-item-container text-container top-border-light'
					id={program.id}
				>
					<img
						aria-label={program.additionalPictures[0].alt}
						className='img class-img'
						src={program.additionalPictures[0].url}
						alt={program.additionalPictures[0].alt}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: '1rem 0 0',
						}}
					>
						<div>
							<img
								aria-label='logo'
								className='img class-logo'
								src={program.logo}
							/>
							<p className='slogan'>{program.sum}</p>
							<p className='class-lesson-amount'>
								{i18n.language === 'tr' ? 'Dersler' : 'Lessons'}:{' '}
								{program.lessons}
							</p>
						</div>
						<div className='classes-more-info-container top-border-light fs-400 '>
							<div className='fs-300'>
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
								onClick={() => handleSelectId(program.id)}
							>
								İncele
								<MdOutlineDoubleArrow style={{ marginTop: 2 }} color='white' />
							</Button>
						</div>
					</div>
				</motion.div>
			);
		});
	});
	return <>{classes}</>;
}
export default ClassList;
