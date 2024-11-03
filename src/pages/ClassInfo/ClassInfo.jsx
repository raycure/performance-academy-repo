import React, { useEffect, useState } from 'react';
import name from '/ornek.jpg';
import { Link, useLocation } from 'react-router-dom';
import './ClassInfo.css';
import LesmillsPrograms from '../../assets/LesmillsPrograms';
import { motion } from 'framer-motion';
import {
	upwardFill,
	accordion,
} from '../../components/animations/AnimationValues.jsx';
import { useTranslation } from 'react-i18next';
import EventList from '../../components/EventItem/EventList.jsx';
function ClassInfo() {
	const { t, i18n } = useTranslation('translation');
	const location = useLocation();
	//useEffect(() => {}, [i18n.language, location.state]);

	const programID =
		location.state?.program || localStorage.getItem('locationFallback').program;
	const program = Object.keys(LesmillsPrograms())
		.map((category) => {
			return LesmillsPrograms()[category].find((program) => {
				return program.id === programID;
			});
		})
		.filter(Boolean)[0];

	const recPrograms = Object.keys(LesmillsPrograms()).map((category) => {
		const objectLength = LesmillsPrograms()[category]?.length;
		let randomNum = Math.floor(Math.random() * objectLength);
		return LesmillsPrograms()[category].slice(randomNum, randomNum + 1);
	}); //selects 3 random courses from each category
	if (!program) {
		return <p>Program not found</p>;
	}
	// const openInNewTab = (url) => {
	// 	window.open(url, '_blank', 'noreferrer');
	// }; //so the link opens in another tab
	return (
		<>
			<div
				className='page-poster-container'
				style={{ paddingLeft: '5vw', flexDirection: 'column' }}
			>
				<img
					aria-label='program pic'
					className='background-image'
					style={{ opacity: 0.6 }}
					src={name}
				/>
				<p className='poster-heading'>{program.title}</p>
				<p className='fs-secondary-heading'>{program.result}</p>
			</div>
			<p className='class-info-sum'>{program.sum}</p>
			{/* video */}
			<div className='class-info-grid bottom-space'>
				<p>{program.description}</p>
				<img src={name} alt='' />
				{!program.why ? (
					<>
						<p>{program.whyMember}</p>
						<p>{program.whyYou}</p>
					</>
				) : (
					<>
						<p>{program.sum}</p>
						<p>{program.why}</p>
					</>
				)}
			</div>
			{/* <div className='payment-but-con bottom-space bg-primary-300 fw-bold'>
				<p className='fs-650' style={{ textAlign: 'center' }}>
					{program.title} Programının <br /> Sertifikalı Eğitmeni Olmak İster
					Misin?
				</p>
				<Button redirect='/program-kaydı' navProp={program.id}>
					Bu Programa Katıl!
				</Button>
			</div> */}
			<EventList
				activeProgram={programID}
				programTitle={program.title}
				infoActive={false}
			/>
			<ul className='class-rec-con'>
				{recPrograms.map((rec) => {
					return rec.map((program, index) => (
						<motion.li
							initial='initial'
							whileHover='animate'
							key={index}
							className='class-rec-item relative-position'
						>
							<img
								src={name}
								alt={`rec-picture-${program.title}`}
								className='background-image'
							/>
							<motion.div
								variants={upwardFill}
								style={{ padding: '0.5rem' }}
								className='bg-primary-500 bg-primary-trnsp'
							>
								<p className='fw-bold'>{program.title}</p>
								<motion.p
									variants={accordion}
									className='fs-400 text-neutral-100'
								>
									{program.sum}
								</motion.p>
								<Link
									to={`/program#${program.id}`}
									state={{ program: program.id }}
									className='fs-400 text-neutral-100'
									onClick={() => {
										window.scrollTo({
											top: 0,
											left: 0,
											behavior: 'instant',
										});
									}}
								>
									İncele
								</Link>
							</motion.div>
						</motion.li>
					));
				})}
				<li
					className='bg-primary-300'
					style={{
						display: 'flex',
						flexDirection: 'column',
						textAlign: 'center',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<p>Aradığınız başka bir program mı var?</p>
					<Link to='/programlar' className='fs-650'>
						Tüm Programları İncele
					</Link>
				</li>
			</ul>
		</>
	);
}
export default ClassInfo;
